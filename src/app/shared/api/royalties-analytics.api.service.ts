import { BaseApi } from './base-api';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { download } from 'utils/common';

@Injectable({
  providedIn: 'root',
})
export class RoyaltiesAnalyticsApiService extends BaseApi {
  commissionsEndpoint = 'teacher-royalty';

  getStudentView(params?: { [key: string]: any }) {
    return this.httpClient.get(
      this.createUrl(this.commissionsEndpoint + '/student-view'),
      {
        params: this.createParams(params),
      }
    );
  }

  getTeacherView(params?: { [key: string]: any }) {
    return this.httpClient.get(
      this.createUrl(this.commissionsEndpoint + '/teacher-view'),
      {
        params: this.createParams(params),
      }
    );
  }
  getMaster(params?: { [key: string]: any }) {
    return this.httpClient.get<any>(
      this.createUrl(this.commissionsEndpoint + '/master'),
      {
        params: this.createParams(params),
      }
    );
  }

  findByTeacherId(id: string, params?: { [key: string]: any }) {
    return this.httpClient.get<any>(
      this.createUrl(`${this.commissionsEndpoint}/master/${id}`),
      {
        params: this.createParams(params),
      }
    );
  }

  downloadExcel(params?: { [key: string]: any }) {
    return this.httpClient.get(this.createUrl(`${this.commissionsEndpoint}/master/excel`), { params: this.createParams(params), responseType: 'blob' }).pipe(
      tap((res) => {
        download(
          res,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Báo cáo chiết khấu giảng viên' + new Date().getTime().toString()
        );
      })
    );
  }

  downloadExcelByTeacherId(id: string) {
    return this.httpClient.get(this.createUrl(`${this.commissionsEndpoint}/master/${id}/excel`), { responseType: 'blob' }).pipe(
      tap((res) => {
        download(
          res,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Báo cáo chiết khấu giảng viên' + new Date().getTime().toString()
        );
      })
    );
  }
}
