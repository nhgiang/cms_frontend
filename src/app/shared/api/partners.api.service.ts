import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { QueryResult, Partner } from 'types/typemodel';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartnersApiService extends BaseApi {
  endpoint = 'partner-registrations';

  getList(params: { page: number; q: string }) {
    let _params = new HttpParams();
    for (let [key, val] of Object.entries(params)) {
      if (val) _params = _params.set(key, val.toString());
    }

    return this.httpClient.get<QueryResult<Partner>>(this.createUrl(''), {
      params: _params,
    });
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
