import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoyaltiesAnalyticsApiService } from '@shared/api/royalties-analytics.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-teacher-discount-report-detail',
  templateUrl: './teacher-discount-report-detail.component.html',
  styleUrls: ['./teacher-discount-report-detail.component.scss']
})
export class TeacherDiscountReportDetailComponent extends DataTableContainer<any> implements OnInit {

  activity: any;
  id: string;
  metaData = [
    {
      key: 'studentName',
      name: 'Tên học viên',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'name',
      name: 'Tên khóa học',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'partnerName',
      name: 'Tên đối tác',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'type',
      name: 'Loại tài khoản',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'coursePrice',
      name: 'Tiền mua',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'royaltyPercentage',
      name: 'Chiết khấu',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'learnerHasCertificate',
      name: 'Thời điểm mua',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'royaltyAmount',
      name: 'Chiết khấu',
      sortable: false,
      class: 'text-center'
    },
  ];
  constructor(
    route: ActivatedRoute,
    router: Router,
    private royaltiesAnalyticsApiService: RoyaltiesAnalyticsApiService
  ) {
    super(route, router);
    this.route.params.subscribe((x) => {
      this.id = x.id;
    });
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      order: this.order,
      sort: this.sort
    };
    return this.royaltiesAnalyticsApiService.findByTeacherId(this.id, params)
  }

  download() {
    this.royaltiesAnalyticsApiService.downloadExcelByTeacherId(this.id).pipe(finalize(() => this.activity.stop('downloading'))).subscribe();
  }
}
