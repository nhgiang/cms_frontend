import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '@shared/interfaces/option.type';
import { DestroyService } from '@shared/services/destroy.service';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractControlDirective } from '../abstract-control.directive';

export interface ParamsSelectAdvance {
  page?: number;
  q?: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'select-advance',
  templateUrl: './select-advance.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAdvanceComponent),
      multi: true
    },
    DestroyService
  ],
})
export class SelectAdvanceComponent extends AbstractControlDirective implements OnInit {

  isLoading = false;
  page = 1;
  timeout: any;
  isDone = false;
  options = [];
  search$: Subject<string>;
  loadMore$: Subject<any>;
  q: string;
  @Input() getOptionsFn: (params: ParamsSelectAdvance | any) => Observable<Option[]>;
  @Input() width: string;
  @Output() readonly csClear = new EventEmitter<void>();

  constructor(
    protected destroy: DestroyService
  ) {
    super();
    this.search$ = new Subject<string>();
    this.loadMore$ = new Subject<any>();
  }

  ngOnInit() {
    this.loadMore();
    this.onSearch();
  }

  writeValue(obj: any) {
    super.writeValue(obj);
  }

  onSearch() {
    this.search$.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
      tap(q => {
        this.q = q;
        this.page = 1;
        this.isLoading = true;
      }),
      switchMap(q => this.getOptionsFn({ page: 1, q }).pipe(finalize(() => this.isLoading = false))),
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.options = data;
    });
  }

  loadMore(): void {
    this.loadMore$.pipe(
      tap(() => this.isLoading = true),
      concatMap(() => this.getOptionsFn({ page: ++this.page, q: this.q }).pipe(finalize(() => this.isLoading = false))),
      takeUntil(this.destroy)
    ).subscribe(this.pushToOption);
  }

  private pushToOption = (data: any[]) => {
    this.options = this.options.concat(data);
  }

  onClear() {
    this.csClear.emit();
  }

}
