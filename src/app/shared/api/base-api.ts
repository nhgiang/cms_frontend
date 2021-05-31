import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { identity, omitBy, pickBy } from 'lodash-es';
import { isNil } from 'ng-zorro-antd/core/util';
import { trimData } from 'utils/common';
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
    return omitBy(trimData(params), isNil); // TODO: Giang xem lại chỗ này xem sao nhé
  }

  protected createUrl(url: string) {
    return this.baseUrl + url;
  }
}
