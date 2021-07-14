import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseApi } from '@shared/api/base-api';
import { PartnerRevenueApiService } from '@shared/api/partner-revenue.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { last, sumBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-partner-revenue-report',
  templateUrl: './partner-revenue-report.component.html',
  styleUrls: ['./partner-revenue-report.component.scss']
})
export class PartnerRevenueReportComponent extends DataTableContainer<any> {
  expandData: any[] = [];

  constructor(
    route: ActivatedRoute,
    router: Router,
    private partnerRevenueApi: PartnerRevenueApiService
  ) {
    super(route, router);
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    return this.partnerRevenueApi.getList(params);
  }

  handleResult(result) {
    super.handleResult(result);
    this.mapExpandData();

  }

  mapExpandData() {
    this.expandData = [];
    this.items.forEach(item => {
      this.expandData.push({
        id: item.id,
        index: item.index,
        name: item.name,
        revenueLabel: 'Tổng doanh thu',
        totalLearner: item.totalLearner,
        cost: item.storageRevenue + sumBy(item.courses, 'royaltyAmount'),
        parent: null,
        expand: false,
        hasChildren: true
      });
      this.expandData.push({
        id: item.id,
        index: null,
        name: null,
        revenueLabel: 'Doanh thu lưu trữ',
        totalLearner: null,
        cost: item.storageRevenue,
        parent: last(this.expandData),
        expand: false,
        hasChildren: false
      });
      this.expandData.push({
        id: item.id,
        index: null,
        name: null,
        revenueLabel: 'Chiết khấu khóa học',
        totalLearner: null,
        cost: item.storageRevenue,
        parent: this.expandData[this.expandData.length - 2],
        expand: false,
        hasChildren: !!item.courses.length
      });
      item.courses.forEach(course => {
        this.expandData.push({
          id: item.id,
          index: null,
          name: null,
          revenueLabel: course.name,
          totalLearner: course.numberOfStudent,
          cost: course.royaltyAmount,
          parent: this.expandData.find(t => t.revenueLabel === 'Chiết khấu khóa học' && t.id === item.id),
          expand: false,
          hasChildren: false
        });
      });
    });
    console.log(this.expandData)
  }

  collapse(a, b, e) {
    if (e) {
      console.log(this.expandData)
      return;
    } else {

    }
  }
}
