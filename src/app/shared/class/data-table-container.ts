import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Meta, QueryResult } from 'types/typemodel';

@Injectable()
// tslint:disable-next-line: component-class-suffix
export abstract class DataTableContainer<T> implements OnInit {
    items: T[];
    meta: Meta;
    sort: string;
    page = 1;
    isloading: boolean;
    params: { [key: string]: any } = {};
    quantity = 10;
    protected refreshTrigger = new Subject();

    ngOnInit() {
        this.subscribe();
        this.refreshTrigger.next();
    }

    refresh() {
        this.refreshTrigger.next();
    }

    onPageChanged(pageNumber: number) {
        this.page = pageNumber;
        this.refresh();
    }

    onSearchParamsChanged(params: { [key: string]: any }) {
        this.page = 1;
        const parsedParams = {};
        // tslint:disable-next-line: forin
        for (const key in params) {
            try {
                parsedParams[key] = JSON.parse(params[key]);
            } catch (e) {
                parsedParams[key] = params[key];
            }
        }
        this.params = parsedParams;
        this.refresh();
    }

    protected abstract fetch(): Observable<QueryResult<T>>;

    protected subscribe() {
        this.refreshTrigger.pipe(
            tap(() => this.isloading = true),
            switchMap(() => this.fetch().pipe(finalize(() => this.isloading = false))),
        ).subscribe({
            next: result => this.handleResult(result)
        });
    }

    protected handleResult(result: QueryResult<T>) {
        this.meta = result.meta;
        this.items = result.items.map((item: T, index) => ({
            ...item,
            index: (index + 1) + ((this.page - 1) * this.quantity)
        }));
    }
}
