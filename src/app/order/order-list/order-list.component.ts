import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { isNil, omitBy } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InvoiceStatus, InvoiceStatusOptions } from 'types/enums';
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
    this.search.patchValue(this.params);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      const params = {
        ...val,
        endDate: val.endDate && val.endDate.toISOString(),
        startDate: val.startDate && val.startDate.toISOString()
      };
      this.onSearchParamsChanged(omitBy(params, isNil));
    });
  }

  protected fetch(): Observable<QueryResult<Invoice>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { status, q, endDate, startDate } = this.params;
    return this.invoiceApi.getList({ ...params, q, status, endDate, startDate });
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
