import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboApiService } from '@shared/api/combo.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.scss']
})
export class ComboFormComponent implements OnInit {
  @Input() data;
  form: FormGroup;
  submiting: boolean;
  objKey: any;
  optionsDisabled: any[];

  get formArrayControls() {
    return this.form && this.form.get('courses') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private courseApi: CourseApiService,
    private comboService: ComboApiService,
    private modalRef: NzModalRef,
    private notificationService: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.formArrayControls.controls.forEach((control, i) => {
      if (i !== 2) {
        control.setValidators(Validators.required);
      }
    });
    this.form.valueChanges.subscribe(value => {
      this.optionsDisabled = value.courses.map(t => {
        return {
          id: t.courseId
        };
      });
    });
  }

  buildForm() {
    this.form = this.fb.group({
      courses: this.fb.array([1, 2, 3].map((val) => this.fb.group({
        courseId: [null]
      }))),
      newPrice: [null, Validators.required],
    });
  }

  courses$ = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(
      // tap(res => res.items.forEach(course => this.objKey[course.id] = course)),
      // tslint:disable-next-line: max-line-length
      map(res => {
        console.log(res);
        return res.items.map(x => ({ value: x.id, label: x.name }));
      })
    );
  }

  submit() {
    console.log(this.form)

    Ultilities.validateForm(this.form);
    this.submiting = true;
    if (this.data) {
      this.comboService.editCombo(this.form.value, this.data.id).subscribe(() => {
        this.notificationService.success('Thành công', 'Cập nhật combo thành công');
        this.modalRef.close(true);
      });
    } else {
      this.comboService.addCommbo(this.form.value).subscribe(() => {
        this.notificationService.success('Thành công', 'Tạo mới kỹ năng thành công');
        this.modalRef.close(true);
      });
    }
  }
}
