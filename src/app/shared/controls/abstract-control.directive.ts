import { ControlValueAccessor } from '@angular/forms';
import { Input, Directive } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Directive()
export abstract class AbstractControlDirective<T = any> implements ControlValueAccessor {

  controlValue: T;

  @Input() @InputBoolean() disabled = false;
  @Input() @InputBoolean() autoFocus = false;
  @Input() placeholder = '';

  onChangeFn: (val: T) => void = () => void 0;
  onTouchedFn: () => void = () => void 0;

  writeValue(obj: any): void {
    this.controlValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onModelChange(value: T) {
    if (typeof this.onChangeFn === 'function') {
      this.onChangeFn(value);
    }
  }
}
