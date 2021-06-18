import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { InvoiceType } from 'types/enums';
import { Invoice, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-detail-revenue',
  templateUrl: './detail-revenue.component.html',
  styleUrls: ['./detail-revenue.component.scss']
})
export class DetailRevenueComponent extends DataTableContainer<any> {
  form: FormGroup;
  invoiceType = InvoiceType;
  quantity = 15;
  metaData = [
    {
      key: 'name',
      name: 'Tên học viên',
      sortable: false,
    },
    {
      key: 'email',
      name: 'Email',
      sortable: false,
    }, {
      key: 'phoneNumber',
      name: 'Điện thoại',
      sortable: false,
    },
    {
      key: 'type',
      name: 'Loại tài khoản',
      sortable: false,
    },
    {
      key: 'courseName',
      name: 'Tên khóa học',
      sortable: false,
    },
    {
      key: 'time',
      name: 'Thời gian',
      sortable: false,
      class: 'text-center'
    },
    {
      key: 'price',
      name: 'Đơn giá',
      sortable: false,
      width: '130px'
    },
    {
      key: 'fee',
      name: 'Phí VNPay',
      sortable: false,
      class: 'text-center',
      width: '100px'
    }
  ];
  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder,
    private invoiceApi: InvoiceApiService,
    private notification: NzNotificationService
  ) {
    super(route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildForm();
    this.form.patchValue({
      ...this.params,
      type: this.params.type,
      startDate: this.params.startDate && new Date(this.params.startDate),
      endDate: this.params.endDate && new Date(this.params.endDate)
    }, { emitEvent: false });
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(val => {
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
    const { q, endDate, startDate, type } = this.params;
    return this.invoiceApi.getListRevenue({ ...params, q, status: 'Success', endDate, startDate, type }).pipe(map(res => {
      const result = res;
      result.items = res.items.map((item: Invoice) => ({
        ...item,
        invoicePrice: item.transactionAmount != null ? item.transactionAmount : item.totalPrice
      }));
      return result;
    }));
  }

  buildForm() {
    this.form = this.fb.group({
      q: [null],
      type: [null],
      endDate: [null],
      startDate: [null],
    });
  }

  downloadExcel() {
    let val = this.form.value;
    const params = {
      ...val,
      endDate: val.endDate && val.endDate.toISOString(),
      startDate: val.startDate && val.startDate.toISOString()
    };
    this.invoiceApi.downloadExcelReport(params).subscribe(() => {
      this.notification.success("Thành công", "Tải xuống báo cáo doanh thu chi tiết thành công!");
    });
  }
}
