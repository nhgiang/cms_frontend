import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingMembershipsApiService } from '@shared/api/setting-memberships.api.service';
import { SettingApiService } from '@shared/api/setting.api.service';
import { ChangePasswordComponent } from '@shared/components/change-password/change-password.component';
import { AuthenticationService } from '@shared/services/authentication.service';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  user$: Observable<any>;
  anonymous: any;

  masterList = [
    {
      title: 'Danh sách đối tác',
      link: '/master/partners'
    },
    {
      title: 'Báo cáo đối tác',
      link: '/master/partner-reports'
    }
  ];

  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;
  courseDays: number;
  settingMembership: any;
  notificationList = [
    {
      title: 'You received a new message',
      time: '8 min',
      icon: 'mail',
      color: 'ant-avatar-' + 'blue',
    },
    {
      title: 'New user registered',
      time: '7 hours',
      icon: 'user-add',
      color: 'ant-avatar-' + 'cyan',
    },
    {
      title: 'System Alert',
      time: '8 hours',
      icon: 'warning',
      color: 'ant-avatar-' + 'red',
    },
    {
      title: 'You have a new update',
      time: '2 days',
      icon: 'sync',
      color: 'ant-avatar-' + 'gold',
    },
  ];

  constructor(
    private themeService: ThemeConstantService,
    private drawerService: NzDrawerService,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NzModalService,
    private settingApi: SettingMembershipsApiService
  ) {
    this.user$ = this.authService.currentUser;
  }

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
    this.authService.anonymousPartnerId$.subscribe(res => {
      this.anonymous = res;
    });
  }

  toggleFold() {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand() {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }

  changePassword() {
    this.drawerService.create({
      nzContent: ChangePasswordComponent,
      nzWidth: 400,
      nzTitle: 'Cập nhật mật khẩu',
    });
  }

  changeAvatar() {
    this.drawerService.create({
      nzContent: ChangeAvatarComponent,
      nzWidth: 400,
      nzTitle: 'Cập nhật Avatar'
    });
  }

  logoutAnonymous() {
    this.authService.clearAnonymous();
    this.router.navigate(['/master/partners']);
  }

  modalSetupCourse() {
    this.settingApi.get().subscribe(res => {
      this.isVisible = true;
      this.courseDays = res.courseDays;
      this.settingMembership = res;
    });
  }

  handleOk() {
    this.settingApi.post({ ...this.settingMembership, courseDays: this.courseDays }).subscribe(() => {
      this.isVisible = false;
    });
  }
}
