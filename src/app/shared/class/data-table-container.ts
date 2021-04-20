import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { DataTableColumnMetaData, Meta, QueryResult } from 'types/typemodel';
import { omitBy, isNil } from 'lodash-es';
import { FormGroup } from '@angular/forms';
import { SortType } from 'types/sort-type';

@Injectable()
// tslint:disable-next-line: component-class-suffix
export abstract class DataTableContainer<T> implements OnInit {
  search: FormGroup;
  items: T[] = [];
  meta: Meta;
  sort: string;
  page = 1;
  isloading: boolean;
  params: { [key: string]: any } = {};
  quantity = 10;
  order: 'ASC' | 'DESC' | '' = '';
  metaData: DataTableColumnMetaData[];
  protected refreshTrigger = new Subject();
  get sortOrder() {
    return SortType.fromName(this.order) ? SortType.fromName(this.order).name : null;
  }

  get currentParams() {
    return this.route.snapshot.params;
  }

  constructor(
    protected route: ActivatedRoute,
    protected router: Router
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

  onPageChanged(pageNumber: number) {
    this.navigate({ ...this.currentParams, page: pageNumber });
  }

  onSearchParamsChanged(params: { [key: string]: any }) {
    this.navigate({ ...this.currentParams, page: 1, ...params });
  }

  onSorted(sort: any) {
    // this.navigate({ ...this.currentParams, page: 1, sort });
  }

  onParamsChanged(event: any) {
    const sort = event.sort.find(t => t.value !== null);
    // this.sort = sort?.name;
    // this.order = sort?.value;
    this.navigate({ ...this.currentParams, page: event.pageIndex, sort: sort?.name, order: sort?.value });
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
    const parsedParams = { ...params };
    // tslint:disable-next-line: forin
    for (const key in parsedParams) {
      try {
        parsedParams[key] = JSON.parse(parsedParams[key]);
      } catch (e) { }
    }
    this.params = parsedParams;
    this.search.patchValue(parsedParams);

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
