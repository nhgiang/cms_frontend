import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyService implements OnDestroy {
  destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
