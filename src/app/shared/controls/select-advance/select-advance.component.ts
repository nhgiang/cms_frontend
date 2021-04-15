import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyService } from '@shared/services/destroy.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
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
  page = 0;
  timeout: any;
  isDone = false;
  options = [];
  search$: Subject<string>;
  loadMore$: Subject<any>;
  q: string;
  @Input() getOptionsFn: (params: ParamsSelectAdvance) => Observable<any>;
  @Output() readonly csClear = new EventEmitter<void>();

  constructor(
    private destroy: DestroyService
  ) {
    super();
    this.search$ = new Subject<string>();
    this.loadMore$ = new Subject<any>();
  }

  ngOnInit() {
    this.loadMore();
    this.onSearch();
  }

  async writeValue(obj: any) {
    super.writeValue(obj);
  }

  onSearch() {
    this.search$.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
      tap(q => this.q = q),
      switchMap(q => this.getOptionsFn({ page: 1, q })),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.options = data;
    });
  }

  async loadMore(): Promise<void> {
    this.loadMore$.pipe(
      tap(() => this.isLoading = true),
      switchMap(x => this.getOptionsFn({ page: this.page++, q: this.q })),
      finalize(() => this.isLoading = false),
      takeUntil(this.destroy)
    ).subscribe(this.pushToOption);
  }

  private pushToOption(data: any[]) {
    this.options = this.options.concat(data.filter(x => !this.options.some(y => y.value === x.value)));
  }

  onClear() {
    this.csClear.emit();
  }

}
