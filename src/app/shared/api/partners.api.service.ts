import { Injectable } from '@angular/core';
import { Partner, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PartnersApiService extends BaseApi {
  endpoint = 'partner-registrations';

  getList(params: { page: number; q: string }) {
    return this.httpClient.get<QueryResult<Partner>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
