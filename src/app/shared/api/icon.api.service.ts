import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class IconApiService extends BaseApi {
  endpoint = 'icons';

  findAll(params: any): Observable<any> {
    return this.httpClient.get(this.createUrl(''), { params: this.createParams(params) });
  }

}
