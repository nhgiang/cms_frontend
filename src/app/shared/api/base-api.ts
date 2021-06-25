import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { omitBy } from 'lodash-es';
import { isValidValue, trimData } from 'utils/common';
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

  protected createParams(params: { [key: string]: any }): any {
    return omitBy(trimData(params), isValidValue);
  }

  protected createUrl(url: string) {
    return this.baseUrl + url;
  }
}
