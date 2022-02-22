import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMaxNumber]'
})
export class MaxNumberDirective {

  @Input()
  public max: number;

  constructor(private ref: ElementRef) { }


  @HostListener('keydown', ['$event'])
  public onInput(e: any): void {
    if (this.max) {
      const functionalKeys = ['Backspace', 'ArrowRight', 'ArrowLeft'];

      if (functionalKeys.indexOf(e.key) !== -1) {
        return;
      }

      const keyValue = +e.key;
      if (isNaN(keyValue)) {
        e.preventDefault();
        return;
      }

      // tslint:disable-next-line: max-line-length
      const hasSelection = this.ref.nativeElement.selectionStart !== this.ref.nativeElement.selectionEnd && this.ref.nativeElement.selectionStart !== null;
      let newValue;
      if (hasSelection) {
        newValue = this.replaceSelection(this.ref.nativeElement, e.key);
      } else {
        newValue = this.ref.nativeElement.value + keyValue.toString();
      }

      if (+newValue > this.max || newValue.length > 3) {
        e.preventDefault();
      }
    }

  }

  private replaceSelection(input, key) {
    const inputValue = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd || input.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
