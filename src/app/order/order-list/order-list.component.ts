import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable, of } from 'rxjs';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends DataTableContainer<any> implements OnInit {
  search: FormGroup;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(route, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buildform();
  }

  protected fetch(): Observable<QueryResult<any>> {
    return of({
      items: [
        // tslint:disable-next-line: max-line-length
        { id: '11111', fullName: 'Nguyễn Văn Trung', email: 'trungnv@ttc-solutions.com', itemName: 'Chăm sóc da 1', status: 'Success', price: 100000, created: new Date() }
      ],
      meta: {
        itemCount: 1,
        totalItems: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      }
    });
  }

  buildform() {
    this.search = this.fb.group({
      q: [],
      status: [],

    })
  }
}
