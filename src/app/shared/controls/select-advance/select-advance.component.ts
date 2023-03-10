import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '@shared/interfaces/option.type';
import { DestroyService } from '@shared/services/destroy.service';
import { isArray, isEmpty, isObject, uniqBy } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
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
      multi: true,
    },
    DestroyService,
  ],
})
export class SelectAdvanceComponent
  extends AbstractControlDirective
  implements OnInit, OnChanges
{
  @Input() getOptionsFn: (
    params: ParamsSelectAdvance | any
  ) => Observable<Option[]>;
  @Input() width: string;
  @Input() optionsDisabled: any[];
  @Input() hasNullOption: boolean;
  @Input() nzAllowClear = true;
  @Input() scrollable = true;
  @Output() readonly csClear = new EventEmitter<void>();
  isLoading = false;
  page = 1;
  timeout: any;
  isDone = false;
  @Input() options = []; // {value: '(id)', label: ''}
  search$: Subject<string>;
  loadMore$: Subject<any>;
  q: string;

  constructor(protected destroy: DestroyService) {
    super();
    this.search$ = new Subject<string>();
    this.loadMore$ = new Subject<any>();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.optionsDisabled?.currentValue) {
      this.handleDisabledOption();
    }
  }

  ngOnInit() {
    this.loadMore();
    this.onSearch();
  }

  writeValue(obj: any) {
    super.writeValue(obj);
    if (isEmpty(obj)) {
      return;
    }
    const ids = isArray(obj)
      ? obj.every((x) => isObject(x))
        ? obj.map((x: any) => x.id)
        : obj
      : [obj];
    this.getOptionsFn({ page: 1, ids })
      .pipe(
        tap((data) => {
          this.options = uniqBy([...this.options, ...data], 'value');
          this.handleDisabledOption();
        })
      )
      .subscribe();
  }

  onSearch() {
    this.search$
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(500),
        tap((q) => {
          this.q = q;
          this.page = 1;
          this.isLoading = true;
        }),
        // tslint:disable-next-line: max-line-length
        switchMap((q) =>
          this.getOptionsFn({ page: 1, q }).pipe(
            finalize(() => (this.isLoading = false)),
            tap((res) => {
              if (res.length > 0) {
                ++this.page;
              }
            })
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe((data) => {
        this.options = data;
        this.handleDisabledOption();
      });
  }

  loadMore(): void {
    this.loadMore$
      .pipe(
        filter(() => this.scrollable),
        tap(() => (this.isLoading = true)),
        concatMap(() =>
          this.getOptionsFn({ page: this.page, q: this.q }).pipe(
            finalize(() => (this.isLoading = false)),
            tap((res) => {
              this.page++;
            })
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe(this.pushToOption);
  }

  private pushToOption = (data: Option<any>[]) => {
    this.options = uniqBy([...this.options, ...data], 'value');
    this.handleDisabledOption();
  };

  onClear() {
    this.csClear.emit();
  }

  handleDisabledOption() {
    if (!this.optionsDisabled) {
      return;
    }
    this.options = this.options.map((option) => {
      return {
        ...option,
        disabled: this.optionsDisabled.some((t) => t.id === option.value),
      };
    });
  }

  reset() {
    this.onSearch();
  }
}
