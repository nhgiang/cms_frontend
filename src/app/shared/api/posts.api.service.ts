import { Injectable } from '@angular/core';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService extends BaseApi {
  endpoint = 'posts';

  getList(params: {
    page: number,
    limit: number,
    q: string
  }) {
    return this.httpClient.get<QueryResult<any>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<any>(this.createUrl(`/${id}`));
  }

  create(body: string) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }

  update(id: string, body: { name: string, id: string }) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
}
