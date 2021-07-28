import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorService } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { PostsApiService } from '@shared/api/posts.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FixFontEditorDirective } from '@shared/services/fix-font-editor-service.ts/fix-font-editor.directive';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss'],
  providers: [FixFontEditorDirective, AngularEditorService]
})
export class BlogEditComponent implements OnInit {
  form: FormGroup;
  imageUrl: string;
  isLoading: boolean;

  blog: any;
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private postType: PostTypesApiService,
    private postsApi: PostsApiService,
    private storageApi: StorageApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.postsApi.getById(id).subscribe(blog => {
      this.blog = blog;
      this.form.patchValue(blog);
      this.imageUrl = blog.coverImage;
    });
  }

  submit() {
    console.log(this.form.value);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverImage).pipe(switchMap(url => {
      const body = this.form.value;
      body.coverImage = url;
      return this.postsApi.update(this.blog.id, this.form.value);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin bài viết thành công!');
      this.router.navigate(['../'], { relativeTo: this.route });
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
