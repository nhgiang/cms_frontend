import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { PartnerPackageApiService } from '@shared/api/partner-packages.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-partner-packages-create',
  templateUrl: 'partner-packages-create.component.html',
})
export class PartnerPackagesCreateComponent implements OnInit {
  constructor(
    private api: PartnerPackageApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NzNotificationService
  ) {}
  form: FormGroup;
  isloading = false;
  editId: string = null;

  ngOnInit() {
    this.editId = this.route.snapshot.params.id;
    this.form = this.fb.group({
      name: [null, [TValidators.required, TValidators.maxLength(20)]],
      maxStorage: [null, [TValidators.required, TValidators.maxLength(3)]],
      monthlyPrice: [null, [TValidators.required, TValidators.maxLength(9)]],
      maxStudents: [null, [TValidators.required, TValidators.maxLength(5)]],
      days: [null, [TValidators.required, TValidators.maxLength(5)]],
    });
    if (this.editId) {
      this.isloading = true;
      this.api
        .get(this.editId)
        .pipe(finalize(() => (this.isloading = false)))
        .subscribe((value) => this.form.patchValue(value));
    }
  }

  submit() {
    Ultilities.validateForm(this.form);

    this.isloading = true;
    if (!this.editId) {
      this.api
        .create(this.form.value)
        .pipe(finalize(() => (this.isloading = false)))
        .subscribe(
          () => {
            this.notif.success(
              'Thành công',
              'Thêm mới gói sản phẩm thành công!'
            );
            this.router.navigate(['/master/partner-packages']);
          },
          (err) => {
            if (err.status === 409)
              this.form.controls['name'].setErrors({ conflict: true });
          }
        );
      return;
    }
    this.api
      .update(this.editId, this.form.value)
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe(() => {
        this.notif.success('Thành công', 'Cập nhật gói sản phẩm thành công!');
        this.router.navigate(['/master/partner-packages']);
      });
  }
}
