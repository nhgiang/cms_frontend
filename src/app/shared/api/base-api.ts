import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from './base-url';

@Injectable()
export abstract class BaseApi {

  endpoint = '';

  constructor(
    protected httpClient: HttpClient,
    @Inject(API_BASE_URL) protected hostUrl: string
  ) { }

  get baseUrl() {
    return `${this.hostUrl}/${this.endpoint}`;
  }

  protected createParams(params: { [key: string]: any }): HttpParams {
    return Object.keys(params).reduce((m, k) => {
      if (params[k] != null) {
        return m.set(k, params[k]);
      }
      return m;
    }, new HttpParams());
  }


  protected createUrl(url: string) {
    return this.baseUrl + url;
  }
}
