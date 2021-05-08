import { Component, OnInit } from '@angular/core';
import { DestroyService } from '@shared/services/destroy.service';
import { startWith, distinctUntilChanged, debounceTime, tap, switchMap, finalize, takeUntil } from 'rxjs/operators';
import { SelectAdvanceComponent } from '../select-advance/select-advance.component';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss'],
  providers: [DestroyService]
})
export class SelectIconComponent extends SelectAdvanceComponent implements OnInit {

  select: string;

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
      switchMap(q => this.getOptionsFn({ page: 1, q, limit: 50 }).pipe(finalize(() => this.isLoading = false), tap((res) => { if (res.length > 0) { ++this.page; } }))),
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.options = data;
      this.handleDisabledOption();
    });
  }
}
