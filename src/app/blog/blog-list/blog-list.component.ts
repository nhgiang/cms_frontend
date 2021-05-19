import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsApiService } from '@shared/api/posts.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent extends DataTableContainer<any> implements OnInit {
  q: FormControl;
  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder,
    private postsApi: PostsApiService,
    private notification: NzNotificationService
  ) {
    super(route, router);
  }

  ngOnInit(): void {
    this.q = this.fb.control(null);
    super.ngOnInit();
    this.q.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSearchParamsChanged({ q: value });
    });
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { q } = this.params;
    return this.postsApi.getList({ ...params, q });
  }

  deleteItem(id) {
    this.postsApi.delete(id).pipe(tap(() => this.refresh())).subscribe(() => {
      this.notification.success('Thành công', 'Xóa thông tin bài viết thành công!');
    });
  }

  readRouteParams(params: { [key: string]: any }) {
    super.readRouteParams(params);
    this.q.patchValue(params?.q, { emitEvent: false });
  }
}
