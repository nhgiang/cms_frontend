import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyService } from '@shared/services/destroy.service';
import { startWith, distinctUntilChanged, debounceTime, tap, switchMap, finalize, takeUntil } from 'rxjs/operators';
import { SelectAdvanceComponent } from '../select-advance/select-advance.component';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss'],
  providers: [
    DestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectIconComponent),
      multi: true
    },
  ]
})
export class SelectIconComponent extends SelectAdvanceComponent implements OnInit {

  select: string;

  writeValue(obj) {
    this.controlValue = obj;
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
      // tslint:disable-next-line: max-line-length
      switchMap(q => this.getOptionsFn({ page: 1, q, limit: 100 }).pipe(finalize(() => this.isLoading = false), tap((res) => { if (res.length > 0) { ++this.page; } }))),
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.options = data;
      this.handleDisabledOption();
    });
  }
}
