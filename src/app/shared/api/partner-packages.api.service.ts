import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class PartnerPackageApiService extends BaseApi {
  endpoint = 'partner-packages';

  getList(partnerId?: string) {
    return this.httpClient.get(
      this.createUrl(''),
      {params: this.createParams({ partnerId })}
    );
  }
  get(id: string) {
    return this.httpClient.get(this.createUrl(`/${id}`));
  }
  create(body: any) {
    return this.httpClient.post(this.createUrl(''), body);
  }
  update(id: string, body: any) {
    return this.httpClient.put(this.createUrl(`/${id}`), body);
  }
  remove(id) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
