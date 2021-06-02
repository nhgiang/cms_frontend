import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-payments-preview',
  templateUrl: './payments-preview.component.html',
  styleUrls: ['./payments-preview.component.scss'],
})
export class PaymentsPreviewComponent implements OnChanges {
  @Input() isPreview: number;
  @Input() payments: any;
  isModalVisible: boolean = false;
  activeBankIndex: number = 0;

  constructor() {}

  ngOnChanges() {
    if (this.isPreview !== 0) this.isModalVisible = true;
    if (this.payments !== undefined && this.payments.length !== 0) {
      this.payments[this.activeBankIndex].isActive = true;
    }
  }

  onCancel() {
    this.isModalVisible = false;
  }
  
  activateBankView(index: number) {
    this.activeBankIndex = index;
    for (let bank of this.payments) bank.isActive = false;
    this.payments[this.activeBankIndex].isActive = true;
  }
}
