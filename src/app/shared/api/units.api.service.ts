import { Injectable } from '@angular/core';
import { Unit } from 'types/models/course';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UnitsApiService extends BaseApi {
  endpoint = 'units';

  createUnit(body) {
    return this.httpClient.post<Unit>(this.createUrl(``), body);
  }

  getUnit(id) {
    return this.httpClient.get<Unit>(this.createUrl(`/${id}`));
  }

  editUnit(id, body) {
    return this.httpClient.put<Unit>(this.createUrl(`/${id}`), body);
  }

  deleteUnit(id) {
    return this.httpClient.delete<Unit>(this.createUrl(`/${id}`));
  }
}
