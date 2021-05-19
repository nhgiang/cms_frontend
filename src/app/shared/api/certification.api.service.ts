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
    return this.httpClient.put(this.createUrl('/a1d85377-d81c-4375-a298-5ce7167a93bf'), body);
  }
}
