import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoyaltiesAnalyticsApiService } from '@shared/api/royalties-analytics.api.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-note-payment',
  templateUrl: './note-payment.component.html',
  styleUrls: ['./note-payment.component.scss'],
})
export class NotePaymentComponent implements OnInit {
  loading: boolean;
  @Input('note') note: string;
  @Input('id') id: string;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: RoyaltiesAnalyticsApiService,
    private modalRef: NzModalRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      note: [this.note],
    });
  }

  submit() {
    this.api.upsertNote(this.id, this.form.value.note).subscribe(() => {
      this.modalRef.close();
    });
  }
}
