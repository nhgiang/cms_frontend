import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SpecializationApiService extends BaseApi {
  endpoint = 'specializations';

  getAll(params) {
    return this.httpClient.get<any>(this.createUrl(''), { params: this.createParams(params) });
  }
}
