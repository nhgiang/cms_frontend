import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Payment } from 'types/typemodel';

@Component({
  selector: 'app-payments-preview',
  templateUrl: './payments-preview.component.html',
  styleUrls: ['./payments-preview.component.scss'],
})
export class PaymentsPreviewComponent {
  @Input() isPreview: boolean;
  @Output() closed = new EventEmitter();
  @Input() payments: Payment[];
  activeBankIndex = 0;

  constructor() {}

  onCancel() {
    this.closed.emit();
  }

  activateBankView(index: number) {
    this.activeBankIndex = index;
  }
}
