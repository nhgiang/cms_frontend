import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentApiService } from '@shared/api/student.api.service';
import { VoucherApiService } from '@shared/api/voucher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SuffixValue } from '../voucher.component';
export enum VoucherTarget {
  GENERAL = 'GENERAL',
  PERSONAL = 'PERSONAL'
}
@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss']
})
export class VoucherFormComponent implements OnInit {
  form: FormGroup;
  VoucherTarget = VoucherTarget;
  @Input() id: string;
  @Output() refresh = new EventEmitter();
  data;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private studentApi: StudentApiService,
    private voucherApiService: VoucherApiService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.form.get('target').valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.form.removeControl('quanlity');
      this.form.removeControl('users');
      if (value === VoucherTarget.GENERAL) {
        this.form.addControl('quanlity', this.fb.control(this.data && this.data.quanlity, [Validators.required]));
      } else {
        this.form.addControl('users', this.fb.control(this.data && this.data.users, [Validators.required]));
      }
    });
    if (this.id) {
      this.voucherApiService.getById(this.id).subscribe((data) => {
        this.data = data;
        this.form.patchValue(data);
        Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (control instanceof FormControl) {
            control.disable();
          }
        });
      });
    }
  }

  users$ = (params: any) => {
    return this.studentApi.getAll(params).pipe(map((res) => res.items.map((x) => ({ value: x.id, label: x.fullName }))));
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, [TValidators.required, TValidators.voucherCode]],
      code: [],
      numberCharacter: [6],
      suffixValue: [SuffixValue.CURRENCY, Validators.required],
      target: [null, Validators.required],
      value: [null, Validators.required],
      startAt: [null, Validators.required],
      endAt: [null, Validators.required],
    });
  }

  generateCode() {
    const prefix = this.form.value.name;
    let result;
    if (!prefix) {
      result = Math.random().toString(36).substring(2, 2 + +this.form.value.numberCharacter).toUpperCase();
    } else {
      result = prefix;
      const chars = '0123456789';
      for (let i = 0; i < +this.form.value.numberCharacter; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    this.form.get('name').patchValue(result);
  }

  submit() {
    Ultilities.validateForm(this.form);
    const formValue = this.form.value;
    const body = {
      ...formValue
    };

    this.voucherApiService.create(body).subscribe(
      () => {
        this.modalRef.close();
        this.refresh.emit();
      },
      () => {
        this.form.get('name').setErrors({ already: true });
      }
    );
  }
}
