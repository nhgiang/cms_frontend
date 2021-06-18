import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-course-type-create',
  templateUrl: './course-type-create.component.html',
  styleUrls: ['./course-type-create.component.scss']
})
export class CourseTypeCreateComponent implements OnInit {
  @ViewChild('input', { static: true }) input: ElementRef
  form: FormGroup;
  loading: boolean;
  @Output() created = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private courseTypesApi: CourseTypesApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.modalRef.afterOpen.subscribe(() => {
      setTimeout(() => {
        this.input.nativeElement.focus();
      })
    })
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.courseTypesApi.create(this.form.value.name.trim()).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Thêm mới loại khóa học thành công!');
      this.created.emit();
    }, err => {
      if (err.status === 409) {
        this.form.controls['name'].setErrors({ dbConflict: true });
      }
    });
  }
}
