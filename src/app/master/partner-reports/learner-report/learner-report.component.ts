import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnerReportApiService } from '@shared/api/learner-report.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { sumBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-learner-report',
  templateUrl: './learner-report.component.html',
  styleUrls: ['./learner-report.component.scss']
})
export class LearnerReportComponent extends DataTableContainer<any> implements OnInit {
  metaData = [
    {
      key: 'partnerName',
      name: 'Tên trung tâm',
      sortable: true
    },
    {
      key: 'totalStudent',
      name: 'Tổng học viên',
      sortable: false,
      class: 'text-center',
      width: '230px'
    },
    {
      key: 'learnerHasPurchase',
      name: 'Học viên mua khóa học',
      sortable: false,
      class: 'text-center',
      width: '230px'
    },
    {
      key: 'learnerHasCertificate',
      name: 'Học viên hoàn thành khóa học',
      sortable: false,
      class: 'text-center',
      width: '230px'
    }
  ];
  totalLearner: number;
  learnerHasPurchase: number;
  learnerHasCertificate: number;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private learnerReportApi: LearnerReportApiService
  ) {
    super(route, router);
  }


  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      order: this.order,
      sort: this.sort
    };
    return this.learnerReportApi.analytics(params).pipe(tap(res => {
      this.totalLearner = sumBy(res.items, 'totalLearner');
      this.learnerHasPurchase = sumBy(res.items, 'learnerHasPurchase');
      this.learnerHasCertificate = sumBy(res.items, 'learnerHasCertificate');
    }));
  }
}
