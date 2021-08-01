import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_BASE_URL } from '@shared/api/base-url';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { PostsApiService } from '@shared/api/posts.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {
  form: FormGroup;
  imageUrl: string;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private postType: PostTypesApiService,
    private postsApi: PostsApiService,
    private storageApi: StorageApiService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverImage).pipe(switchMap(url => {
      const body = this.form.value;
      body.coverImage = url;
      return this.postsApi.create(this.form.value);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Thêm mới thông tin bài viết thành công!');
      this.router.navigate(['/blog/blog-management']);
    });
  }

  blogTypes = (params: {
    page: number,
    limit: number
  }) => {
    return this.postType.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })));
  }

  uploaded(url) {
    this.imageUrl = url;
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, [TValidators.textRange(1, 80)]],
      content: [null, [TValidators.required]],
      description: [null, [TValidators.textRange(1, 255)]],
      coverImage: [null, [Validators.required]],
      typeId: [null, [TValidators.required]]
    });
  }
}
