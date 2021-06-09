import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { InvoiceStatus, InvoiceStatusOptions, InvoiceType } from 'types/enums';
import { Invoice, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends DataTableContainer<Invoice> implements OnInit {
  search: FormGroup;
  invoiceStatusOptions = InvoiceStatusOptions;
  invoiceStatus = InvoiceStatus;
  invoiceType = InvoiceType;
  slice = 3;
  constructor(
    router: Router,
    route: ActivatedRoute,
    private fb: FormBuilder,
    private invoiceApi: InvoiceApiService
  ) {
    super(route, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buildform();
    this.search.patchValue({
      ...this.params,
      startDate: this.params.startDate && new Date(this.params.startDate),
      endDate: this.params.endDate && new Date(this.params.endDate)
    }, { emitEvent: false });
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      const params = {
        ...val,
        endDate: val.endDate && val.endDate.toISOString(),
        startDate: val.startDate && val.startDate.toISOString()
      };
      this.onSearchParamsChanged(params);
    });
  }

  protected fetch(): Observable<QueryResult<Invoice>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { status, q, endDate, startDate } = this.params;
    return this.invoiceApi.getList({ ...params, q, status, endDate, startDate }).pipe(map(res => {
      const result = res;
      result.items = res.items.map((item: Invoice) => ({
        ...item,
        invoicePrice: item.transactionAmount != null ? item.transactionAmount : item.totalPrice
      }));
      return result;
    }));
  }

  sliceData(index: number) {
    this.slice = this.slice === 3 ? this.items[index]?.items.length : 3;
  }

  exportExcel() {
    const { status, q, endDate, startDate } = this.params;
    this.invoiceApi.downloadExcel({ status, q, endDate, startDate }).subscribe();
  }

  buildform() {
    this.search = this.fb.group({
      q: [],
      status: [],
      endDate: [],
      startDate: [],
    });
  }
}
