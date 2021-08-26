import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_BASE_URL } from '@shared/api/base-url';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { PostsApiService } from '@shared/api/posts.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, map, switchMap } from 'rxjs/operators';
import { SettingKeyEndPoint } from 'types/enums';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss'],
})
export class BlogEditComponent implements OnInit {
  form: FormGroup;
  imageUrl: string;
  isLoading: boolean;

  blog: any;
  hottestBlogs: any;
  isHottest = false;

  hottestLoading = false;
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private postType: PostTypesApiService,
    private postsApi: PostsApiService,
    private storageApi: StorageApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NzNotificationService,
    private settingApi: SettingApiService<{ blogId: string }>
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.HottestBlog);
  }

  ngOnInit(): void {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.postsApi.getById(id).subscribe((blog) => {
      this.blog = blog;
      this.form.patchValue(blog);
      this.imageUrl = blog.coverImage;
    });
    this.settingApi.get().subscribe((data: any) => {
      this.hottestBlogs = data
        .filter((value) => value.blogId !== null)
        .map((value) => {
          if (value.blogId === id) this.isHottest = true;
          return value;
        });
    });
  }

  submit() {
    this.isLoading = true;
    this.storageApi
      .uploadFile(this.form.value.coverImage)
      .pipe(
        switchMap((url) => {
          const body = this.form.value;
          body.coverImage = url;
          return this.postsApi.update(this.blog.id, this.form.value);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.notification.success(
          'Thành công',
          'Cập nhật thông tin bài viết thành công!'
        );
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  blogTypes = (params: { page: number; limit: number }) => {
    return this.postType.getList(params).pipe(
      map((res) =>
        res.items.map((x) => {
          return { value: x.id, label: x.name };
        })
      )
    );
  };

  uploaded(url) {
    this.imageUrl = url;
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, [TValidators.textRange(1, 80)]],
      content: [null, [TValidators.required]],
      description: [null, [TValidators.textRange(1, 255)]],
      coverImage: [null, [Validators.required]],
      typeId: [null, [TValidators.required]],
    });
  }

  hottestToggle() {
    if (!this.isHottest) {
      if (this.hottestBlogs.length >= 3)
        this.notification.error(
          'Thất bại',
          'Số lượng bài viết hot nhất đã đạt giới hạn 3!'
        );
      else {
        this.hottestLoading = true;
        this.hottestBlogs.push({
          blogId: this.route.snapshot.paramMap.get('id'),
        });
        this.settingApi
          .post(this.hottestBlogs)
          .pipe(finalize(() => (this.hottestLoading = false)))
          .subscribe(() => {
            this.isHottest = true;
            this.notification.success(
              'Thành công',
              'Thêm bài viết hot nhất thành công'
            );
          });
      }
    } else {
      this.hottestLoading = true;
      this.hottestBlogs = this.hottestBlogs.filter(
        (obj) => obj.blogId !== this.route.snapshot.params.id
      );
      this.settingApi
        .post(this.hottestBlogs)
        .pipe(finalize(() => (this.hottestLoading = false)))
        .subscribe(() => {
          this.isHottest = false;
          this.notification.success(
            'Thành công',
            'Hủy bỏ bài viết hot nhất thành công!'
          );
        });
    }
  }
}
