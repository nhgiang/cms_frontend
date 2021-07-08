import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '@shared/api/auth.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { AuthenticationService } from '@shared/services/authentication.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  form: FormGroup;
  user: User;
  loading: boolean;
  constructor(
    private fb: FormBuilder,
    private authApi: AuthApiService,
    private drawerRef: NzDrawerRef,
    private notification: NzNotificationService,
    private authService: AuthenticationService,
    private storageApi: StorageApiService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.user = user);
    this.buildform();
  }

  hide() {
    this.drawerRef.close();
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.loading = true;
    this.storageApi.uploadFile(this.form.value.avatar).pipe(
      switchMap(url => {
        return this.authApi.changeAvatar({ avatar: url });
      })
    ).subscribe(() => {
      this.loading = false;
      this.hide();
      this.notification.success('Thành công', 'Cập nhật avatar thành công!');
    });
  }

  buildform() {
    this.form = this.fb.group({
      email: [{ value: this.user.email, disabled: true }],
      avatar: [this.user.avatar, Validators.required],
    });
  }
}
