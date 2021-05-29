import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService extends BaseApi {
  endpoint = 'comments';

  get(params: any): Observable<any> {
    return this.httpClient.get(this.createUrl(`/admin`), { params: this.createParams(params) });
  }

  findByLesson(params: any): Observable<any> {
    return this.httpClient.get(this.createUrl(`/findByLesson`), { params: this.createParams(params) });
  }

  update(body) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`))
  }
}
