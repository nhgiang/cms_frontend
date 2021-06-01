import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as bankdata from '../bankdata.json';

interface Bank {
  imageUrl: string;
  bankName: string;
  bankFullname: string;
}
@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  imageUrl = null;
  vnpayOption = false;
  bankData: Bank[] = bankdata['default'];
  selectedBankIndex: number;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {}

  beforeUpload = (image) => {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(image)
    );
    return false;
  };

  onBankSelect(index: number) {
    const selectedBank = this.bankData[index];
    this.selectedBankIndex = index;
    this.imageUrl = selectedBank.imageUrl;
  }
  vnpayToggler() {
    this.vnpayOption = !this.vnpayOption;
    console.log(this.vnpayOption);
  }
}
