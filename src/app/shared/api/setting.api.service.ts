import { Injectable } from '@angular/core';
import { Faq } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SettingApiService extends BaseApi {
  endpoint = 'setting';

  premiums = {
    get: () => this.httpClient.get<any>(this.createUrl('-premiums')),
    post: (body) => this.httpClient.post<any>(this.createUrl('-premiums'), body)
  };

  footer = {
    get: () => this.httpClient.get<any>(this.createUrl('-footers')),
    post: (body) => this.httpClient.post<any>(this.createUrl('-footers'), body)
  };

  faq = {
    get: () => this.httpClient.get<any>(this.createUrl('-question-answers')),
    post: (body: Faq[]) => this.httpClient.post<any>(this.createUrl('-question-answers'), body)
  };
}
