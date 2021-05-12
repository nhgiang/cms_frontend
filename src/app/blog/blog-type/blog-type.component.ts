import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { PostTypesApiService } from '@shared/api/post-types.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, of } from 'rxjs';
import { BlogType, QueryResult } from 'types/typemodel';
import { BlogTypeCreateComponent } from './blog-type-create/blog-type-create.component';
import { BlogTypeEditComponent } from './blog-type-edit/blog-type-edit.component';

@Component({
  selector: 'app-blog-type',
  templateUrl: './blog-type.component.html',
  styleUrls: ['./blog-type.component.scss']
})
export class BlogTypeComponent extends DataTableContainer<BlogType> {
  constructor(
    router: Router,
    route: ActivatedRoute,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private postTypeApi: PostTypesApiService
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<BlogType>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    return this.postTypeApi.getList(params);
  }

  deleteTeacher(id: string) {
    this.postTypeApi.delete(id).subscribe(() => {
      this.notification.success('Thành công', 'Xóa thôn tin loại bài viết thành công!');
      this.refresh();
    });
  }

  addItem() {
    const modalRef = this.modalService.create({
      nzContent: BlogTypeCreateComponent,
      nzTitle: 'Thêm mới loại bài viết'
    });
    modalRef.componentInstance.created.subscribe(() => {
      this.refresh();
    });
  }

  editItem(id) {
    const modalRef = this.modalService.create({
      nzContent: BlogTypeEditComponent,
      nzTitle: 'Cập nhật loại bài viết',
      nzComponentParams: { id }
    });
    modalRef.componentInstance.edited.subscribe(() => {
      this.refresh();
    });
  }
}
