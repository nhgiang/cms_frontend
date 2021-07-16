import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';
import { download } from 'utils/common';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PartnerRevenueApiService extends BaseApi {
  endpoint = 'partner-revenue-analystics';

  getList(params: any) {
    return this.httpClient.get<QueryResult<any>>(
      this.createUrl(''),
      { params: this.createParams(params) }
    );
  }

  downloadExcel() {
    return this.httpClient.get(this.createUrl('/download'), { responseType: 'blob' }).pipe(
      tap((res) => {
        download(
          res,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Báo cáo doanh thu đối tác' + new Date().getTime().toString()
        );
      })
    );
  }
}
