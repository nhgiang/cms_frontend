import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { TValidators } from '@shared/extentions/validators';
import { replace } from 'lodash-es';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-partners-edit',
  templateUrl: './partners-edit.component.html',
  styleUrls: ['./partners-edit.component.scss']
})
export class PartnersEditComponent implements OnInit {
  @Input() data: any;
  form: FormGroup;
  currentStep = 0;

  constructor(
    private partnersApiService: PartnersApiService,
    private fb: FormBuilder,
    private modalRef: NzModalRef<PartnersEditComponent>,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    this.form.get('domain').setValue(this.form.get('domain').value + '.beautyup.asia');
    const next = () => {
      this.notification.success('Thành công', 'Cập nhật thông tin partner thành công!');
      this.modalRef.close(true);
    };
    const err = () => {
      this.notification.error('Thất bại', 'Cập nhật thông tin partner thất bại!')
    }
    this.partnersApiService.update(this.data.id, this.form.value).subscribe(next, err);
  }

  close() {
    this.modalRef.close(false);
  }

  validateDomain(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() => {
        return this.partnersApiService.validateDomain(control.value).pipe(
          map((res) => {
            return res && control.value !== this.data.domain ? { exits: true } : null;
          })
        );
      })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.data?.name, [TValidators.required]],
      representative: [this.data?.representative, [TValidators.required]],
      address: [this.data?.address, [TValidators.required]],
      domain: [this.data?.domain.replace('.beautyup.asia', ''), [TValidators.required], this.validateDomain.bind(this)],
      phoneNumber: [this.data.phoneNumber, [TValidators.required, TValidators.phoneNumber]],
      size: [this.data.size, [TValidators.required, TValidators.maxLength(6), TValidators.min(1), TValidators.onlyNumber()]],
      email: [this.data.email, [TValidators.required]],
      settings: this.fb.group({
        maxCourses: [Number(this.data?.settings?.maxCourses), [TValidators.required, TValidators.maxLength(3), TValidators.min(1), TValidators.onlyNumber()]],
      })
    });
  }
}
