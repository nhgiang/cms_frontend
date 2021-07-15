import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnerPackageApiService } from '@shared/api/partner-packages.api.service';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { iif, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { merge } from 'lodash';
import { OTHERID } from 'types/enums';

@Component({
  selector: 'app-partners-edit',
  templateUrl: './partners-edit.component.html',
  styleUrls: ['./partners-edit.component.scss'],
})
export class PartnersEditComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;
  currentStep = 0;
  pkgList: any = [];
  myPkg: any;
  constructor(
    private partnersApiService: PartnersApiService,
    private fb: FormBuilder,
    private modalRef: NzModalRef<PartnersEditComponent>,
    private pkgApi: PartnerPackageApiService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.pkgApi.getList(this.data.id).subscribe((data: any) => {
      this.pkgList = data;
      this.myPkg = this.pkgList.find((pkg) => pkg.id === this.data.packageId);
      let customPkg = this.pkgList.find(
        (pkg) => pkg?.tailoredPartnerId === this.data.id
      );
      if (!customPkg)
        this.pkgList.push({
          name: 'Khác',
          id: OTHERID,
          maxStorage: null,
          maxStudents: null,
          monthlyPrice: null,
          days: null,
          tailoredPartnerId: true,
        });
      this.form.get('customPackage').patchValue(this.myPkg);
      if (!this.myPkg?.tailoredPartnerId)
        this.form.get('customPackage').disable();
    });
  }

  submit() {
    Ultilities.validateForm(this.form);

    const domain = `${
      this.form.get('domain').value + this.partnersApiService.endpointUrl
    }`;
    const next = () => {
      this.notification.success(
        'Thành công',
        'Cập nhật thông tin partner thành công!'
      );
      this.modalRef.close(true);
    };
    const err = () => {
      this.notification.error(
        'Thất bại',
        'Cập nhật thông tin partner thất bại!'
      );
      this.modalRef.close(true);
    };
    iif(
      () => domain === this.data.domain,
      of(false),
      this.partnersApiService.validateDomain(domain).pipe(
        tap((res) => {
          if (res) {
            this.form.get('domain').setErrors({ exits: true });
          }
        })
      )
    )
      .pipe(
        filter((x) => !x),
        switchMap(() => {
          return this.partnersApiService.update(
            this.data.id,
            merge(this.form.value, { domain })
          );
        })
      )
      .subscribe(next, err);
  }

  close() {
    this.modalRef.close(false);
  }

  // validateDomain(
  //   control: AbstractControl
  // ): Observable<ValidationErrors | null> {
  //   return timer(300).pipe(
  //     switchMap(() => {
  //       return this.partnersApiService
  //         .validateDomain(
  //           `${control.value}${this.partnersApiService.endpointUrl}`
  //         )
  //         .pipe(
  //           map((res) => {
  //             return res &&
  //               control.value !==
  //               this.data.domain.replace(
  //                 this.partnersApiService.endpointUrl,
  //                 ''
  //               )
  //               ? { exits: true }
  //               : null;
  //           })
  //         );
  //     })
  //   );
  // }
  onChange(value) {
    const pkg = this.pkgList.find((pkg) => pkg.id === value);
    this.form.get('customPackage').patchValue(pkg);
    if (pkg.tailoredPartnerId) this.form.get('customPackage').enable();
    else this.form.get('customPackage').disable();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.data?.name, [TValidators.required]],
      representative: [this.data?.representative, [TValidators.required]],
      address: [this.data?.address, [TValidators.required]],
      domain: [
        this.data?.domain.replace('.beautyup.asia', ''),
        [TValidators.required, TValidators.maxLength(10)],
      ],
      phoneNumber: [
        this.data.phoneNumber,
        [TValidators.required, TValidators.phoneNumber],
      ],
      size: [
        this.data.size,
        [
          TValidators.required,
          TValidators.maxLength(6),
          TValidators.min(1),
          TValidators.onlyNumber(),
        ],
      ],
      email: [this.data.email, [TValidators.required, TValidators.emailRules]],
      packageId: [this.data?.packageId, TValidators.required],
      customPackage: this.fb.group({
        maxStorage: ['', TValidators.required],
        monthlyPrice: ['', TValidators.required],
        maxStudents: ['', TValidators.required],
        days: ['', TValidators.required],
      }),
    });
  }
}
