import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyService } from '@shared/services/destroy.service';
import { SelectAdvanceComponent } from '../select-advance/select-advance.component';

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
export class MultipleSelectionComponent extends SelectAdvanceComponent implements OnChanges {
  @Input() maxMultipleCount: number;
  @Input() findByIds: any[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.findByIds?.currentValue) {
      this.ids = changes.findByIds?.currentValue;
      this.search$.next(this.q);
    }
  }
}
