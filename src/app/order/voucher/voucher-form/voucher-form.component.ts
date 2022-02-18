import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentApiService } from '@shared/api/student.api.service';
import { VoucherApiService } from '@shared/api/voucher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { map } from 'rxjs/operators';
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
  constructor(
    private fb: FormBuilder,
    private studentApi: StudentApiService,
    private voucherApiService: VoucherApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.form.get('target').valueChanges.subscribe(value => {
      this.form.removeControl('quanlity');
      this.form.removeControl('userIds');
      if (value === VoucherTarget.GENERAL) {
        this.form.addControl('quanlity', this.fb.control('', [Validators.required]));
      } else {
        this.form.addControl('userIds', this.fb.control('', [Validators.required]));
      }
    });
  }

  users$ = (params: any) => {
    return this.studentApi.getAll(params).pipe(map((res) => res.items.map((x) => ({ value: x.id, label: x.fullName }))));
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, [TValidators.required, TValidators.voucherCode]],
      code: [],
      numberCharacter: [6],
      sufixValue: [null, Validators.required],
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
      ...this.form.value
    };

    this.voucherApiService.create(body);
  }
}
