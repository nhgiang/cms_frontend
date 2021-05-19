import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class CertificationApiService extends BaseApi {
  endpoint = 'certificates';

  get() {
    return this.httpClient.get(this.createUrl(``));
  }

  update(body) {
    return this.httpClient.post(this.createUrl(''), body);
  }
}
