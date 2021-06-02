import { Component, Input, OnChanges } from '@angular/core';
import { Payment } from 'types/typemodel';

@Component({
  selector: 'app-payments-preview',
  templateUrl: './payments-preview.component.html',
  styleUrls: ['./payments-preview.component.scss'],
})
export class PaymentsPreviewComponent implements OnChanges {
  @Input() isPreview: number;
  @Input() payments: Payment[];
  isModalVisible = false;
  activeBankIndex = 0;

  constructor() {}

  ngOnChanges() {
    if (this.isPreview !== 0) this.isModalVisible = true;
  }

  onCancel() {
    this.isModalVisible = false;
  }

  activateBankView(index: number) {
    this.activeBankIndex = index;
  }
}
