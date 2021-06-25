import { Injectable } from '@angular/core';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class PartnersApiService extends BaseApi {
  endpoint = 'partners';
  public endpointUrl = '.beautyup.asia';

  getList(params: any) {
    return this.httpClient.get<QueryResult<any>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getOne(id: string) {
    return this.httpClient.get<QueryResult<any>>(this.createUrl(`/${id}`));
  }

  create(body: any) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  update(id: string, body) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }

  validateDomain(domain: string) {
    return this.httpClient.get(this.createUrl(`/${domain}/exists`));
  }

  getDomain(domain: string) {
    return this.httpClient.get(this.createUrl('/domain'), { params: { q: domain }, responseType: 'text' });
  }
}
