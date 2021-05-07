import { DecimalPipe } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    },
    DecimalPipe
  ],
})
export class InputNumberComponent implements OnInit {

  demoValue = 100;
  formatter = (value: number) => {
    try {
      return `${this.decimalPipe.transform(value)} đ`;
    } catch (error) {
      return '';
    }
  }
  parser = (value: string) => value.replace(' đ', '');

  constructor(
    private decimalPipe: DecimalPipe
  ) {
    // super();
  }

  ngOnInit() {
  }

}
