import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import merge from 'lodash-es/merge';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, timer } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-partners-edit',
  templateUrl: './partners-edit.component.html',
  styleUrls: ['./partners-edit.component.scss'],
})
export class PartnersEditComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;
  currentStep = 0;

  constructor(
    private partnersApiService: PartnersApiService,
    private fb: FormBuilder,
    private modalRef: NzModalRef<PartnersEditComponent>,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    Ultilities.validateForm(this.form);
    const domain = `${this.form.get('domain').value + this.partnersApiService.endpointUrl}`;
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
    this.partnersApiService.validateDomain(domain).pipe(
      tap(res => {
        if (res) {
          this.form.get('domain').setErrors({ exits: true });
        }
      }),
      filter(x => !x),
      switchMap(() => {
        return this.partnersApiService.update(this.data.id, merge(this.form.value, { domain }));
      })
    ).subscribe(next, err);
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
      settings: this.fb.group({
        maxFileSizeUpload: [
          Number(this.data?.settings?.maxFileSizeUpload),
          [
            TValidators.required,
            TValidators.maxLength(3),
            TValidators.min(1),
            TValidators.onlyNumber(),
          ],
        ],
      }),
    });
  }
}
