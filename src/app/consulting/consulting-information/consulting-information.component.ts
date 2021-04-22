import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApiService } from '@shared/api/contact.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ContactStatus } from 'types/enums';
import { ConsultingInformation, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-consulting-information',
  templateUrl: './consulting-information.component.html',
  styleUrls: ['./consulting-information.component.scss']
})
export class ConsultingInformationComponent extends DataTableContainer<ConsultingInformation> implements OnInit {
  search: FormGroup;
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
    return this.contactApi.getList({ ...params, q, status }).pipe(map((res) => {
      res.items = res.items.map(item => {
        item.statusTransformed = item.status === ContactStatus.Contacted ? 'Đã liên hệ' : 'Chưa liên hệ'
        return item;
      });
      return res;
    }));
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
