import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseApi {
  endpoint = 'notifications';

  createNotification(body: {
    message: string,
    receivers: string[]
  }) {
    return this.httpClient.post<any>(this.createUrl(`/admin-create`), body);
  }

  getNotification() {
    return this.httpClient.get<any>(this.createUrl(''));
  }
}
