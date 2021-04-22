import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseTypesApiService } from '@shared/api/course.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-course-type-edit',
  templateUrl: './course-type-edit.component.html',
  styleUrls: ['./course-type-edit.component.scss']
})
export class CourseTypeEditComponent implements OnInit {
  @Input() id: string;
  @Output() created = new EventEmitter();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseTypesApi: CourseTypesApiService,
    private notification: NzNotificationService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.courseTypesApi.getById(this.id).subscribe(res => {
      this.form.patchValue(res);
    })
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    const data = {
      name: this.form.value.name.trim(),
      id: this.id
    };
    this.courseTypesApi.update(this.id, data).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Cập nhật loại khóa học thành công');
      this.created.emit();
    });
  }
}
