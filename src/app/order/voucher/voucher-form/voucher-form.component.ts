import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentApiService } from '@shared/api/student.api.service';
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
    private studentApi: StudentApiService
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
      name: [, Validators.required],
      code: [],
      numberCharacter: [],
      symbol: [, Validators.required],
      target: [, Validators.required],
      value: [, Validators.required],
      created: [, Validators.required],
      endAt: [, Validators.required],
    });
  }

  generateCode() {
    
  }
}
