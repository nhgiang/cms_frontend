import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { DataTableColumnMetaData, Meta, QueryResult } from 'types/typemodel';
import { omitBy, isNil } from 'lodash-es';
import { trimData } from 'utils/common';

@Injectable()
// tslint:disable-next-line: component-class-suffix
export abstract class DataTableContainer<T> implements OnInit {
  items: T[] = [];
  meta: Meta;
  sort: string;
  page = 1;
  isloading: boolean;
  params: { [key: string]: any } = {};
  quantity = 10;
  order: string;
  metaData: DataTableColumnMetaData[];
  protected refreshTrigger = new Subject();

  get currentParams() {
    return this.route.snapshot.params;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.subscribe();
  }

  refresh() {
    this.params = {};
    this.page = 1;
    this.refreshTrigger.next();
  }

  onSearchParamsChanged(params: { [key: string]: any }) {
    this.navigate({ ...this.currentParams, page: 1, ...params });
  }
  
  onParamsChanged(event: any) {
    const sort = event.sort.find(t => t.value !== null);
    this.navigate({ ...this.currentParams, page: event.pageIndex, sort: sort?.key, order: sort?.value });
  }

  protected abstract fetch(): Observable<QueryResult<T>>;

  protected subscribe() {
    merge(this.refreshTrigger, this.route.params).pipe(
      tap(this.readRouteParams.bind(this)),
      switchMap(() => {
        this.isloading = true;
        return this.fetch().pipe(finalize(() => this.isloading = false));
      }),
    ).subscribe({
      next: result => this.handleResult(result)
    });
  }

  protected readRouteParams(params: { [key: string]: any }) {
    const { page, quantity, sort, order } = params;
    this.page = +page || 1;
    this.quantity = +quantity || this.quantity;
    this.metaData.forEach((column, i) => {
      if (column.key === sort) {
        this.metaData[i].sortOrder = order;
      } else {
        this.metaData[i].sortOrder = null;
      }
    });
    this.sort = sort;
    this.order = order && (order === 'ascend' ? 'ASC' : 'DESC');
    const parsedParams = { ...params };
    // tslint:disable-next-line: forin
    for (const key in trimData(parsedParams)) {
      try {
        parsedParams[key] = JSON.parse(parsedParams[key]);
      } catch (e) { }
    }
    this.params = parsedParams;
  }

  protected navigate(params: Params) {
    params = omitBy(Object.assign({}, params), isNil);
    this.router.navigate([params], { relativeTo: this.route });
  }

  protected handleResult(result: QueryResult<T>) {
    this.meta = result.meta;
    this.items = result.items.map((item: T, index) => ({
      ...item,
      index: (index + 1) + ((this.page - 1) * this.quantity)
    }));
  }
}
