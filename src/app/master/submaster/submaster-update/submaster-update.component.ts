import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SubMasterApiService } from '@shared/api/submaster.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap, finalize } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-submaster-update',
  templateUrl: './submaster-update.component.html',
})
export class SubMasterUpdateComponent implements OnInit {
  form: FormGroup;
  isPasswordVisible = false;
  isLoading: boolean;
  assistance: User;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private subMasterService: SubMasterApiService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      password: [null, TValidators.passwordRules],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
      avatar: [null, TValidators.required],
    });
    const assistanceId = this.route.snapshot.paramMap.get('id');
    this.subMasterService.getById(assistanceId).subscribe((res) => {
      this.assistance = res;
      this.form.patchValue(res);
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi
      .uploadFile(this.form.value.avatar)
      .pipe(
        switchMap((url) => {
          const data = {
            ...this.form.value,
            avatar: url,
            id: this.assistance.id,
          };
          return this.subMasterService.update(this.assistance.id, data);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.notification.success(
            'Thành công',
            'Cập nhật thông tin nhân viên thành công!'
          );
        },
        (err) => {
          if (err.error.statusCode === 409) {
            this.form.get('email').setErrors({ notUnique: true });
          }
        }
      );
  }
}
