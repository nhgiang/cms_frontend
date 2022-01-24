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
  styleUrls: ['./combo-form.component.scss'],
})
export class ComboFormComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;
  submitting: boolean;
  objKey: any;
  optionsDisabled: any[];

  get formArrayControls() {
    return this.form && (this.form.get('courseIds') as FormArray);
  }

  constructor(
    private fb: FormBuilder,
    private courseApi: CourseApiService,
    private comboService: ComboApiService,
    private modalRef: NzModalRef,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.formArrayControls.controls.forEach((control, i) => {
      if (i !== 2) {
        control.setValidators(Validators.required);
      }
    });
    if (this.data) {
      const value = {
        ...this.data,
        courseIds: this.data.courseIds.map((t) => ({ courseId: t })),
      };
      this.form.patchValue(value);
    }
    this.form.valueChanges.subscribe((value) => {
      this.optionsDisabled = value.courseIds.map((t) => {
        return {
          id: t.courseId,
        };
      });
    });
  }

  buildForm() {
    this.form = this.fb.group({
      courseIds: this.fb.array(
        Array(10)
          .fill(0)
          .map(() =>
            this.fb.group({
              courseId: [null],
            })
          )
      ),
      price: [null, Validators.required],
      name: [null, Validators.required],
    });
  }

  courses$ = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(
      // tap(res => res.items.forEach(course => this.objKey[course.id] = course)),
      // tslint:disable-next-line: max-line-length
      map((res) => {
        return res.items.map((x) => ({ value: x.id, label: x.name }));
      })
    );
  };

  submit() {
    Ultilities.validateForm(this.form);
    const body = this.form.value;
    body.courseIds = body.courseIds.map((x) => x.courseId).filter((x) => x);
    this.submitting = true;
    if (this.data) {
      this.comboService
        .editCombo(this.form.value, this.data.id)
        .subscribe(() => {
          this.notificationService.success(
            'Thành công',
            'Cập nhật combo thành công'
          );
          this.modalRef.close(true);
        });
    } else {
      this.comboService.addCommbo(this.form.value).subscribe(() => {
        this.notificationService.success(
          'Thành công',
          'Tạo mới kỹ năng thành công'
        );
        this.modalRef.close(true);
      });
    }
  }
}
