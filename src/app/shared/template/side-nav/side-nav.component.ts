import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@shared/services/authentication.service';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { User } from 'types/typemodel';
import { ROUTES } from './side-nav-routes.config';

const ROOT_PARTNER_ID = '00000000-0000-0000-0000-000000000000';
@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent implements OnInit {
  menuItems: any[];
  isFolded: boolean;
  isSideNavDark: boolean;
  isExpand: boolean;
  currentUser: User;
  isRoot: boolean;
  constructor(
    private themeService: ThemeConstantService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
    this.themeService.isSideNavDarkChanges.subscribe(
      (isDark) => (this.isSideNavDark = isDark)
    );
    this.isRoot = this.authService.partnerId === ROOT_PARTNER_ID;
  }

  closeMobileMenu(): void {
    if (window.innerWidth < 992) {
      this.isFolded = false;
      this.isExpand = !this.isExpand;
      this.themeService.toggleExpand(this.isExpand);
      this.themeService.toggleFold(this.isFolded);
    }
  }
}
