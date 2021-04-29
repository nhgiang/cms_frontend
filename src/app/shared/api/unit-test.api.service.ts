import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class UnitTestApiService extends BaseApi {
  endpoint = 'unit-test';

  getById() {
    
  }
}
