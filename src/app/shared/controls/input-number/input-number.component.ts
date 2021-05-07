import { DecimalPipe } from '@angular/common';
import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlDirective } from '../abstract-control.directive';

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
export class InputNumberComponent extends AbstractControlDirective implements OnInit {

  initValue = 0;
  currencyChars = new RegExp('[\.,]', 'g');

  constructor(
    private decimalPipe: DecimalPipe
  ) {
    super();
  }

  formatter = (value: number) => {
    try {
      if (!value || Number(value < 0)) { return `0 đ`; }
      // tslint:disable-next-line: radix
      return `${this.decimalPipe.transform(parseInt(String(value).replace(this.currencyChars, '')))} đ`;
    } catch (error) {
      return 0;
    }
  }
  parser = (value: string) => value.trim().replace(' đ', '');

  writeValue(obj) {
    if (obj) {
      this.initValue = obj;
    }
  }

  onFocus() {
    this.initValue = 0;
  }

  ngOnInit() {
  }

}
