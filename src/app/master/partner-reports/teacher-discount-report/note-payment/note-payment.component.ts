import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-payment',
  templateUrl: './note-payment.component.html',
  styleUrls: ['./note-payment.component.scss']
})
export class NotePaymentComponent implements OnInit {
  loading: boolean;
  form: FormGroup
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      note: [null]
    })
  }

}
