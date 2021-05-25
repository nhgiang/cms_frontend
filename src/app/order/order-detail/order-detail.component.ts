import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentStatusOptions } from '@shared/options/student-status.options';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  form: FormGroup;
  order: any;
  StudentStatusOptions = StudentStatusOptions;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      transactionId: this.fb.control({ value: 13, disabled: true }, Validators.required),
      bank: [],
      bankTransactionId: [],
      time: [],
      price: [],
      status: [],
    });
  }
}
