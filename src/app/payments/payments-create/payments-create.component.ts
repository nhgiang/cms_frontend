import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payments-create',
  templateUrl: './payments-create.component.html',
  styleUrls: ['./payments-create.component.scss'],
})
export class PaymentsCreateComponent implements OnInit {
  imageUrl = null;
  vnpayOption = false;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {}

  beforeUpload = (image) => {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(image)
    );
    return false;
  };

  vnpayToggler() {
    this.vnpayOption = !this.vnpayOption;
    console.log(this.vnpayOption);
  }
}
