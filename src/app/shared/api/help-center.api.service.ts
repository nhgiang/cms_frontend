import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class HelpCenterApiService extends BaseApi {
  endpoint = 'help-center';

  create(body: any) {
    return this.httpClient.post<any>(this.createUrl(''), body);
  }

  list(params: any) {
    return this.httpClient.get<any>(this.createUrl(''), { params: this.createParams(params) });
  }

  find(id: string) {
    return this.httpClient.get<any>(this.createUrl(`/admin/${id}`));
  }

  edit(id: string, body: any) {
    return this.httpClient.put<any>(this.createUrl(`/${id}`), body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
