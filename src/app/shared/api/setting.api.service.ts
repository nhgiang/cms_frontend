import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingKey, SettingKeyEndPoint } from 'types/enums';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SettingApiService<T> extends BaseApi {

  setEnpoint(key: SettingKeyEndPoint) {
    this.endpoint = `setting-${key}`;
  }

  get(): Observable<T> {
    return this.httpClient.get<T>(this.createUrl(``));
  }

  post(body: any): Observable<T> {
    return this.httpClient.post<T>(this.createUrl(``), body);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SettingVisibleApiService extends BaseApi {
  endpoint = `settings`;

  update(key: SettingKey, body: { visible: boolean }) {
    return this.httpClient.patch(this.createUrl(`/update-visible/${key}`), body);
  }

  get(key: SettingKey) {
    return this.httpClient.get<{ visible: boolean }>(this.createUrl(`/check-visible/${key}`));
  }
}
