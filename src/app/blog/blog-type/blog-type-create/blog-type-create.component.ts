import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-blog-type-create',
  templateUrl: './blog-type-create.component.html',
  styleUrls: ['./blog-type-create.component.scss']
})
export class BlogTypeCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  @Output() created = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private postTypesApi: PostTypesApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.loading = true;
    this.postTypesApi.create(this.form.value.name.trim()).pipe(finalize(() => this.loading = false)).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Thêm mới loại bài viết thành công!');
      this.created.emit();
    });
  }
}
