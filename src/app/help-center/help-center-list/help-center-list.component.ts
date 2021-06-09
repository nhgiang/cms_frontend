import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpCenterApiService } from '@shared/api/help-center.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HelpCenter, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-help-center-list',
  templateUrl: './help-center-list.component.html',
  styleUrls: ['./help-center-list.component.scss']
})
export class HelpCenterListComponent extends DataTableContainer<HelpCenter> implements OnInit {

  search: FormGroup;
  metaData = [
    {
      key: 'title',
      name: 'Tên bài viết hướng dẫn sử dụng',
      sortable: false,
      width: '250px'
    },
    {
      key: 'view',
      name: 'Lượt xem',
      sortable: false,
    }, {
      key: 'like',
      name: 'Like',
      sortable: false,
    },
    {
      key: 'disLike',
      name: 'Dislike',
      sortable: false,
    },
    {
      key: 'created',
      name: 'Ngày cập nhật',
      sortable: false,
    },
    {
      key: 'name',
      name: 'Người cập nhật',
      sortable: false,
    }
  ];
  constructor(
    private fb: FormBuilder,
    router: Router,
    route: ActivatedRoute,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService
  ) {
    super(route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.search.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<HelpCenter>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      sort: this.sort,
      order: this.order
    };
    const { q } = this.params;
    return this.helpCenterApiService.list({ ...params, q });
  }

  buildForm() {
    this.search = this.fb.group({
      q: [null],
    });
  }

  delete(id: string) {
    this.helpCenterApiService.delete(id).subscribe(res => {
      this.notification.success('Thành công', 'Xóa bài viết thành công');
      this.refreshTrigger.next();
    })
  }
}
