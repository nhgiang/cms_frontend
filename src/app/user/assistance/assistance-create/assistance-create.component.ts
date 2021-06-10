import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistanceApiService } from '@shared/api/assistance.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';

@Component({
  selector: 'app-assistance-create',
  templateUrl: './assistance-create.component.html',
  styleUrls: ['./assistance-create.component.scss']
})
export class AssistanceCreateComponent implements OnInit {

  form: FormGroup;
  isPasswordVisible = false;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private assistanceApi: AssistanceApiService,
    private router: Router,
    private route: ActivatedRoute, 
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      password: ['', [TValidators.required, TValidators.passwordRules]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
      avatar: [null, TValidators.required]
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.avatar).pipe(
      switchMap((url) => {
        const data = {
          ...this.form.value,
          avatar: url,
        };
        Object.keys(data).forEach(k => data[k] = data[k].trim());
        return this.assistanceApi.create(data);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.notification.success('Thành công', 'Thêm mới thông tin nhân viên thành công!');
    }, err => {
      if (err.error.statusCode === 409) {
        this.form.get('email').setErrors({ notUnique: true });
      }
    });
  }
}
