import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.ant-input-number-focused]': 'isFocused',
    '[class.ant-input-number-lg]': `nzSize === 'large'`,
    '[class.ant-input-number-sm]': `nzSize === 'small'`,
    '[class.ant-input-number-disabled]': 'nzDisabled',
    '[class.ant-input-number-rtl]': `dir === 'rtl'`
  }
})
export class InputNumberComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, OnDestroy {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin = -Infinity;
  @Input() nzMax = Infinity;
  @Input() nzPrecision?: number;
  @Input() nzPlaceHolder = '';
  @Input() nzStep = 1;
  @Input() nzInputMode = 'decimal';
  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  currencyChars = new RegExp('[\.,]', 'g');
  private autoStepTimer?: any;
  private parsedValue?: string | number;
  private value?: number;
  private destroy$ = new Subject<void>();
  displayValue?: string | number;
  isFocused = false;
  disabledUp = false;
  disabledDown = false;
  dir: Direction = 'ltr';
  @Input() nzParser = (value: string) => value.trim();
  @Input() nzFormatter = (value: number) => {
    try {
      if (!value || Number(value < 0)) { return `0`; }
      // tslint:disable-next-line: radix
      return `${this.decimalPipe.transform(parseInt(String(value).replace(this.currencyChars, '')))}`;
    } catch (error) {
      return 0;
    }
  }
  onChange: OnChangeType = () => { };
  onTouched: OnTouchedType = () => { };

  onModelChange(value: string): void {
    this.parsedValue = this.nzParser(value);
    this.inputElement.nativeElement.value = `${this.parsedValue}`;
    const validValue = this.getCurrentValidValue(this.parsedValue);
    this.setValue(validValue);
  }

  getCurrentValidValue(value: string | number): number {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = `${this.getValidValue(val)}`;
    } else {
      // tslint:disable-next-line: no-non-null-assertion
      val = this.value!;
    }
    return this.toNumber(val);
  }

  isNotCompleteNumber(num: string | number): boolean {
    return isNaN(num as number) || num === '' || num === null || !!(num && num.toString().indexOf('.') === num.toString().length - 1);
  }

  getValidValue(value?: string | number): string | number | undefined {
    let val = parseFloat(value as string);
    if (isNaN(val)) {
      return value;
    }
    if (val < this.nzMin) {
      val = this.nzMin;
    }
    if (val > this.nzMax) {
      val = this.nzMax;
    }
    return val;
  }

  toNumber(num: string | number): number {
    if (this.isNotCompleteNumber(num)) {
      return num as number;
    }
    const numStr = String(num);
    if (numStr.indexOf('.') >= 0 && isNotNil(this.nzPrecision)) {
      if (typeof this.nzPrecisionMode === 'function') {
        return this.nzPrecisionMode(num, this.nzPrecision);
      } else if (this.nzPrecisionMode === 'cut') {
        const numSplit = numStr.split('.');
        numSplit[1] = numSplit[1].slice(0, this.nzPrecision);
        return Number(numSplit.join('.'));
      }
      return Number(Number(num).toFixed(this.nzPrecision));
    }
    return Number(num);
  }

  getRatio(e: KeyboardEvent): number {
    let ratio = 1;
    if (e.metaKey || e.ctrlKey) {
      ratio = 0.1;
    } else if (e.shiftKey) {
      ratio = 10;
    }
    return ratio;
  }

  down(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('down', e, ratio);
  }

  up(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('up', e, ratio);
  }

  getPrecision(value: number): number {
    const valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  }

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // if this.props.precision is undefined
  // https://github.com/react-component/input-number/issues/39
  getMaxPrecision(currentValue: string | number, ratio: number): number {
    if (isNotNil(this.nzPrecision)) {
      return this.nzPrecision;
    }
    const ratioPrecision = this.getPrecision(ratio);
    const stepPrecision = this.getPrecision(this.nzStep);
    const currentValuePrecision = this.getPrecision(currentValue as number);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  }

  getPrecisionFactor(currentValue: string | number, ratio: number): number {
    const precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  }

  upStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result = ((precisionFactor * val + precisionFactor * this.nzStep * rat) / precisionFactor).toFixed(precision);
    } else {
      result = this.nzMin === -Infinity ? this.nzStep : this.nzMin;
    }
    return this.toNumber(result);
  }

  downStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result = ((precisionFactor * val - precisionFactor * this.nzStep * rat) / precisionFactor).toFixed(precision);
    } else {
      result = this.nzMin === -Infinity ? -this.nzStep : this.nzMin;
    }
    return this.toNumber(result);
  }

  step<T extends keyof NzInputNumberComponent>(type: T, e: MouseEvent | KeyboardEvent, ratio: number = 1): void {
    this.stop();
    e.preventDefault();
    if (this.nzDisabled) {
      return;
    }
    // tslint:disable-next-line: no-non-null-assertion
    const value = this.getCurrentValidValue(this.parsedValue!) || 0;
    let val = 0;
    if (type === 'up') {
      val = this.upStep(value, ratio);
    } else if (type === 'down') {
      val = this.downStep(value, ratio);
    }
    const outOfRange = val > this.nzMax || val < this.nzMin;
    if (val > this.nzMax) {
      val = this.nzMax;
    } else if (val < this.nzMin) {
      val = this.nzMin;
    }
    this.setValue(val);
    this.updateDisplayValue(val);
    this.isFocused = true;
    if (outOfRange) {
      return;
    }
    this.autoStepTimer = setTimeout(() => {
      (this[type] as (e: MouseEvent | KeyboardEvent, ratio: number) => void)(e, ratio);
    }, 300);
  }

  stop(): void {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  setValue(value: number): void {
    if (`${this.value}` !== `${value}`) {
      this.onChange(value);
    }
    this.value = value;
    this.parsedValue = value;
    this.disabledUp = this.disabledDown = false;
    if (value || value === 0) {
      const val = Number(value);
      if (val >= this.nzMax) {
        this.disabledUp = true;
      }
      if (val <= this.nzMin) {
        this.disabledDown = true;
      }
    }
  }

  updateDisplayValue(value: number): void {
    const displayValue = isNotNil(this.nzFormatter(value)) ? this.nzFormatter(value) : '';
    this.displayValue = displayValue;
    this.inputElement.nativeElement.value = `${displayValue}`;
  }

  onKeyDown(e: KeyboardEvent): void {
    // tslint:disable-next-line: deprecation
    if (e.keyCode === UP_ARROW) {
      const ratio = this.getRatio(e);
      this.up(e, ratio);
      this.stop();
    // tslint:disable-next-line: deprecation
    } else if (e.keyCode === DOWN_ARROW) {
      const ratio = this.getRatio(e);
      this.down(e, ratio);
      this.stop();
    // tslint:disable-next-line: deprecation
    } else if (e.keyCode === ENTER) {
      // tslint:disable-next-line: no-non-null-assertion
      this.updateDisplayValue(this.value!);
    }
  }

  writeValue(value: number): void {
    this.value = value;
    this.setValue(value);
    this.updateDisplayValue(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private decimalPipe: DecimalPipe,
    @Optional() private directionality: Directionality,
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-input-number');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.isFocused = false;
          // tslint:disable-next-line: no-non-null-assertion
          this.updateDisplayValue(this.value!);
          this.nzBlur.emit();
          Promise.resolve().then(() => this.onTouched());
        } else {
          this.isFocused = true;
          this.nzFocus.emit();
          this.displayValue = this.getCurrentValidValue(this.displayValue);
          this.inputElement.nativeElement.value = `${this.getCurrentValidValue(this.displayValue)}`;
        }
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzFormatter && !changes.nzFormatter.isFirstChange()) {
      // tslint:disable-next-line: no-non-null-assertion
      const validValue = this.getCurrentValidValue(this.parsedValue!);
      this.setValue(validValue);
      this.updateDisplayValue(validValue);
    }
  }

  ngAfterViewInit(): void {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.destroy$.next();
    this.destroy$.complete();
  }
}