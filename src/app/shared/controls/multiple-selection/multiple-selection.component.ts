import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyService } from '@shared/services/destroy.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractControlDirective } from '../abstract-control.directive';
import { ParamsSelectAdvance } from '../select-advance/select-advance.component';

@Component({
  selector: 'app-multiple-selection',
  templateUrl: './multiple-selection.component.html',
  styleUrls: ['./multiple-selection.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleSelectionComponent),
      multi: true
    },
    DestroyService
  ],
})
export class MultipleSelectionComponent extends AbstractControlDirective implements OnInit {

  @Input() apiFn: (params: ParamsSelectAdvance) => Observable<any>;
  @Input() listOfSelectedValue: string[];
  listOfOption: string[] = [];
  page = 1;
  q: string;
  search$: Subject<string>;
  isLoading = false;

  constructor(
    private destroy: DestroyService
  ) {
    super();
    this.search$ = new Subject();
  }

  ngOnInit(): void {
    this.search$.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      tap(q => {
        this.q = q;
        this.page = 1;
        this.isLoading = true;
      }),
      switchMap(() => this.apiFn({ page: this.page, q: this.q }).pipe(finalize(() => this.isLoading = false))),
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.listOfOption = data;
    });
  }



}
