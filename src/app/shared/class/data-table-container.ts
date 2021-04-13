import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Meta, QueryResult } from 'types/typemodel';

@Injectable()
// tslint:disable-next-line: component-class-suffix
export abstract class DataTableContainer<T> implements OnInit {
    items: T[] = [];
    meta: Meta;
    sort: string;
    page = 1;
    isloading: boolean;
    params: { [key: string]: any } = {};
    protected refreshTrigger = new Subject();

    constructor(
        public quantity: number = 10,
    ) {
    }

    // tslint:disable-next-line: contextual-lifecycle
    ngOnInit() {
        this.subscribe();
        this.refreshTrigger.next();
    }

    refresh() {
        this.params = {};
        this.page = 1;
        this.refreshTrigger.next();
    }

    onPageChanged(pageNumber: number) {
        this.page = pageNumber;
        this.refreshTrigger.next();
    }

    onSearchParamsChanged(params: { [key: string]: any }) {
        this.page = 1;
        const parsedParams = {};
        Object.keys(params).forEach(k => params[k] = params[k] && params[k].trim());
        // tslint:disable-next-line: forin
        for (const key in params) {
            try {
                parsedParams[key] = JSON.parse(params[key]);
            } catch (e) {
                parsedParams[key] = params[key];
            }
        }
        this.params = parsedParams;
        this.refreshTrigger.next();
    }

    protected abstract fetch(): Observable<QueryResult<T>>;

    protected subscribe() {
        const next = (result: QueryResult<T>) => {
            this.handleResult(result);
        };

        this.refreshTrigger.pipe(
            switchMap(() => {
                this.isloading = true;
                return this.fetch().pipe(finalize(() => this.isloading = false));
            }),
        ).subscribe(next);
    }

    protected handleResult(result: QueryResult<T>) {
        this.meta = result.meta;
        this.items = result.items.map((item: T, index) => {
            return {
                ...item,
                index: (index + 1) + ((this.page - 1) * this.quantity)
            };
        });
    }
}
