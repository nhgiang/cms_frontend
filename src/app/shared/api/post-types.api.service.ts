import { Injectable } from '@angular/core';
import { BlogType, QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class PostTypesApiService extends BaseApi {
  endpoint = 'post-types';

  getList(params: {
    page: number,
    limit: number
  }) {
    return this.httpClient.get<QueryResult<BlogType>>(this.createUrl(''), { params: this.createParams(params) });
  }

  getById(id) {
    return this.httpClient.get<BlogType>(this.createUrl(`/${id}`));
  }

  create(name: string) {
    return this.httpClient.post(this.createUrl(''), { name });
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }

  update(id: string, body: { name: string, id: string }) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
}
