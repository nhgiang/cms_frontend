import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { Payment } from 'types/typemodel';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentsApiService extends BaseApi {
  endpoint = 'setting-payments';

  getList() {
    return this.httpClient.get<Payment[]>(this.createUrl(''));
  }

  postAppend(body: Payment) {
    //concat this body to current list & send back to server
    //different page --> get list again
    //create occurs at payments/create
    return this.getList().pipe(
      switchMap((currentList: Payment[]) => {
        let newList = <Payment[]>[...currentList, body];
        return this.httpClient.post(this.createUrl(''), [...newList]);
      })
    );
  }

  postDelete(payments: Payment[]) {
    //same page, no need to getList again
    //delete occurs at /payments
    return this.httpClient.post(this.createUrl(''), payments);
  }
}
