import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser;
  }

  searchVisible = false;
  quickViewVisible = false;
  isFolded: boolean;
  isExpand: boolean;

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

  ngOnInit(): void {
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
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

  activateSideView() {
    //change-password
    this.themeService.toggleSideView(true);
  }
}
