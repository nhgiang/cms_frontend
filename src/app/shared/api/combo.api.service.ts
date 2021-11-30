import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';
import { API_BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class ComboApiService extends BaseApi {
  endpoint = 'combos';

  getList(params: any) {
    return this.httpClient.get<QueryResult<any>>(this.createUrl(''), { params: this.createParams(params) });
  }

  addCommbo(body: any) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  editCombo(body, id) {
    return this.httpClient.put(this.createUrl(`${id}`), body);
  }

  deleteCombo(id) {
    return this.httpClient.delete(this.createUrl(`${id}`));
  }
}
