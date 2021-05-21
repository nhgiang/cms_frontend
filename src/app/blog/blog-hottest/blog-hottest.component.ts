import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { PostsApiService } from '@shared/api/posts.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, map, tap } from 'rxjs/operators';
import { Blog } from 'types/typemodel';

@Component({
  selector: 'app-blog-hottest',
  templateUrl: './blog-hottest.component.html',
  styleUrls: ['./blog-hottest.component.scss']
})
export class BlogHottestComponent implements OnInit {
  form: FormArray;
  objKey: { [key: string]: Blog } = {};
  optionsDisabled: any[];
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService,
    private postsApi: PostsApiService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.array(Array(3).fill(0).map(() => this.fb.group({
      blogId: [null]
    })));
    this.settingApi.hottestBlog.get().subscribe(res => {
      const data = res.map(t => {
        return {
          blogId: t.blogId ?? 0
        };
      });
      this.form.patchValue(data, { emitEvent: false });
    });
    this.form.valueChanges.subscribe(value => {
      this.optionsDisabled = value.map(t => {
        return {
          id: t.blogId
        };
      });
    });
  }

  blog$ = (params: any) => {
    return this.postsApi.getList(params).pipe(
      tap(res => res.items.forEach(blog => this.objKey[blog.id] = blog)),
      // tslint:disable-next-line: max-line-length
      map(res => {
        return res.items.map(x => ({ value: x.id, label: x.title }));
      })
    );
  }

  submit() {
    this.isLoading = true;
    const body = this.form.value.map(val => {
      return {
        blogId: val.blogId || null
      };
    });
    this.settingApi.hottestBlog.post(body).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin bài viết hot nhất thành công');
    });
  }
}
