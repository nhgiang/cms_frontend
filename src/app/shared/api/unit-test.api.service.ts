import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UnitTestApiService extends BaseApi {
  endpoint = 'unit-tests';

  getById(id: string): Observable<any> {
    return this.httpClient.get(this.createUrl(`/${id}`));
  }

  create(body = {}): Observable<any> {
    return this.httpClient.post(this.createUrl(''), body);
  }

  update(id: string, body = {}): Observable<any> {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
}
