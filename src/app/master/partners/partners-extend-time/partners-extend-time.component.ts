import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { DatetimePipe } from '@shared/pipes/datetime.pipe';
import { isAfter, isFuture, isSameDay, isToday } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-partners-extend-time',
  templateUrl: 'partners-extend-time.component.html',
})
export class PartnersExtendTimeComponent implements OnInit {
  data: any = [];
  form: FormGroup;
  isLoading = false;
  constructor(
    private readonly api: PartnersApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private notif: NzNotificationService,
    private datePipe: DatetimePipe
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.api
      .getTime(this.route.snapshot.params.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((d: any) => {
        this.data[0] = new Date(d.extendedStart);
        this.data[1] = new Date(d.extendedExpired);
        this.form.controls['currentDuration'].setValue(this.data);
      });
    this.form = this.fb.group({
      currentDuration: [null],
      extendedDuration: [null, TValidators.required],
    });
    this.form.controls['extendedDuration'].valueChanges.subscribe((value) => {
      this.logicalValidate();
    });
  }

  validate() {
    Ultilities.validateForm(this.form);
    this.logicalValidate();

    this.modal.confirm({
      nzTitle: 'Xin vui lòng xác nhận thời gian gia hạn',
      nzContent: `Thời gian gia hạn sẽ bắt đầu từ ngày <b>${this.datePipe.transform(
        this.form.controls['extendedDuration'].value[0]
      )}</b> tới ngày <b>${this.datePipe.transform(
        this.form.controls['extendedDuration'].value[1]
      )}</b>`,
      nzOnOk: () => this.submit(),
    });
  }

  logicalValidate() {
    const extendedStart = this.form.controls['extendedDuration'].value?.[0];
    const extendedExpired = this.form.controls['extendedDuration'].value?.[1];
    if (!extendedStart || !extendedExpired) return;
    if (!isAfter(extendedExpired, extendedStart)) {
      this.form.controls['extendedDuration'].setErrors({ sameday: true });
      return;
    }
    if (
      !isAfter(extendedStart, this.data[1]) &&
      !isSameDay(extendedStart, this.data[1])
    ) {
      this.form.controls['extendedDuration'].setErrors({ expireddate: true });
      return;
    }
    if (!isFuture(extendedStart) && !isToday(extendedStart)) {
      this.form.controls['extendedDuration'].setErrors({ now: true });
      return;
    }
  }
  submit() {
    this.api
      .postTime(this.route.snapshot.params.id, {
        extendedStart: this.form.controls['extendedDuration'].value[0],
        extendedExpired: this.form.controls['extendedDuration'].value[1],
      })
      .subscribe(() => {
        this.notif.success('Thành công', 'Gia hạn gói sản phẩm thành công');
        this.router.navigate(['/master']);
      });
  }
}
