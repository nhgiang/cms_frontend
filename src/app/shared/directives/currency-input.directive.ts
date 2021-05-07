import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[currency-input]',
  providers: [DecimalPipe]
})
export class CurrencyInputDirective {
  currencyChars = new RegExp('[\.,]', 'g');
  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ['$event.target.value']) onInput(e: string) {
    this.format(e);
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(val: string) {
    // tslint:disable-next-line: radix
    const numberFormat = parseInt(String(val).replace(this.currencyChars, ''));
    const usd = this.decimalPipe.transform(numberFormat, '1.0', 'en-US');
    this.renderer.setProperty(this.el.nativeElement, 'value', usd);
  }
}
