import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable } from 'rxjs';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-teacher-discount-report',
  templateUrl: './teacher-discount-report.component.html',
  styleUrls: ['./teacher-discount-report.component.scss']
})
export class TeacherDiscountReportComponent extends DataTableContainer<any> implements OnInit {
  protected fetch(): Observable<QueryResult<any>> {
    throw new Error('Method not implemented.');
  }
  isLoading = false;
  form: FormGroup;
  metaData = [
    {
      key: 'name',
      name: 'Tên giảng viên',
      sortable: false,
    },
    {
      key: 'domain',
      name: 'Tên khóa học',
      sortable: false,
    },
    {
      key: 'username',
      name: 'Lượt đăng ký',
      sortable: false,
    },

    {
      key: 'adminEmail',
      name: 'Tổng chiết khấu',
      sortable: false,
    }
  ];
  constructor(
    route: ActivatedRoute,
    router: Router,
  ) {
    super(route, router);
  }

  ngOnInit() {
  }

}
