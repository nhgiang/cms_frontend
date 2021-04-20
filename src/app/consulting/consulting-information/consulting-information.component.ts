import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApiService } from '@shared/api/contact.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConsultingInformation, DataTableColumnMetaData, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-consulting-information',
  templateUrl: './consulting-information.component.html',
  styleUrls: ['./consulting-information.component.scss']
})
export class ConsultingInformationComponent extends DataTableContainer<ConsultingInformation> implements OnInit {
  metaData = [
    {
      key: 'name',
      name: 'Tên khách hàng',
      sortable: false,
    },
    {
      key: 'email',
      name: 'Email',
      sortable: false,
    },
    {
      key: 'phoneNumber',
      name: 'Số điện thoại',
      sortable: false,
    }, {
      key: 'created',
      name: 'Ngày gửi',
      sortable: true,
    },
    {
      key: 'courseInterested',
      name: 'Khóa học quan tâm',
      sortable: false,
    },
    {
      key: 'status',
      name: 'Trạng thái',
      sortable: false,
    }
  ];
  constructor(
    private fb: FormBuilder,
    router: Router,
    route: ActivatedRoute,
    private contactApi: ContactApiService
  ) {
    super(route, router);
  }

  ngOnInit(): void {
    this.buildForm();
    super.ngOnInit();
    this.search.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<ConsultingInformation>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      sort: this.sort,
      order: this.order
    };
    const { status, q } = this.params;
    return this.contactApi.getList({ ...params, q, status });
  }

  deleteItems(id: string) {

  }

  buildForm() {
    this.search = this.fb.group({
      q: [null],
      status: [null]
    });
  }
}
