import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-blog-type-edit',
  templateUrl: './blog-type-edit.component.html',
  styleUrls: ['./blog-type-edit.component.scss']
})
export class BlogTypeEditComponent implements OnInit {
  @Input() id: string;
  @Output() edited = new EventEmitter();
  form: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private postTypesApi: PostTypesApiService,
    private notification: NzNotificationService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.postTypesApi.getById(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
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
    this.loading = true;
    this.postTypesApi.update(this.id, data).pipe(finalize(() => this.loading = false)).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Cập nhật thông tin loại bài viết thành công');
      this.edited.emit();
    }, err => {
      if (err.status === 409) {
        this.form.controls['name'].setErrors({ dbConflict: true });
      }
    });
  }
}
