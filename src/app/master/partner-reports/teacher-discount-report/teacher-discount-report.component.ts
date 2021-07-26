import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoyaltiesAnalyticsApiService } from '@shared/api/royalties-analytics.api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, finalize } from 'rxjs/operators';
import { Activity } from 'utils/Activity';
import { NotePaymentComponent } from './note-payment/note-payment.component';

@Component({
  selector: 'app-teacher-discount-report',
  templateUrl: './teacher-discount-report.component.html',
  styleUrls: ['./teacher-discount-report.component.scss'],
})
export class TeacherDiscountReportComponent implements OnInit {
  activity = new Activity();
  isLoading = false;
  form: FormGroup;
  items: any[];
  currentPage = 1;
  @ViewChild('basicTable') table: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private royaltiesAnalyticsApiService: RoyaltiesAnalyticsApiService,
    private modal: NzModalService
  ) {
    this.form = this.fb.group({
      q: [null],
    });
  }

  ngOnInit() {
    this.fetch();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((x) => {
      this.fetch({ q: x.q });
    });
  }

  sortFn = (a: any, b: any) => a.fullName.localeCompare(b.fullName);

  fetch(params?: any, page?: number) {
    this.items = [];
    this.isLoading = true;
    this.royaltiesAnalyticsApiService
      .getMaster(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data) => {
        this.items = data.map((x) => {
          x.totalRegistration = x.courses.reduce(
            (a, b) => a + (parseInt(b.totalRegistration) || 0),
            0
          );
          x.totalAmount = x.courses.reduce(
            (a, b) => a + (parseInt(b.royaltyAmount) || 0),
            0
          );
          return x;
        });
        if (page) this.currentPage = page;
      });
  }

  download() {
    this.royaltiesAnalyticsApiService
      .downloadExcel()
      .pipe(finalize(() => this.activity.stop('downloading')))
      .subscribe();
  }

  updateNote(id, note) {
    const modalRef = this.modal.create({
      nzContent: NotePaymentComponent,
      nzTitle: 'Cập nhật ghi chú',
      nzComponentParams: {
        id: id,
        note: note,
      },
    });
    modalRef.afterClose.subscribe(() => this.fetch({}, this.currentPage));
  }
}
