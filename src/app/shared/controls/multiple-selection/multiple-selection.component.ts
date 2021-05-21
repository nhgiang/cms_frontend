import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DestroyService } from '@shared/services/destroy.service';
import { NzOptionComponent, NzOptionContainerComponent, NzOptionItemComponent, NzSelectComponent } from 'ng-zorro-antd/select';
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
export class MultipleSelectionComponent extends SelectAdvanceComponent implements OnInit {
  @Input() maxMultipleCount: number;

  ngOnInit() {
    super.ngOnInit();
  }
}
