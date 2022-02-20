import { Injectable } from "@angular/core";
import { QueryResult, User } from "types/typemodel";
import { BaseApi } from "./base-api";

@Injectable({
  providedIn: 'root'
})
export class VoucherApiService extends BaseApi {
  endpoint = 'voucher';

  getList(params: {
    limit: number,
    page: number,
    q: string,
    isActive?: boolean,
    endAt?: Date,
    startAt?: Date
  }) {
    return this.httpClient.get<QueryResult<User>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  create(body) {
    return this.httpClient.post(this.createUrl(''), body);
  }

  update(id: string, body: any) {
    return this.httpClient.patch(this.createUrl(`/${id}`), body);
  }

  getById(id: string) {
    return this.httpClient.get(this.createUrl(`/${id}`));
  }
}
