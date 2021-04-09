import { Directive, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routerMatch]'
})
export class RouterMatchDirective {
  @Input() routerMatch: string;
  @Input() hasSub: boolean;

  constructor(private router: Router) { }

  @HostBinding('class')
  get inActive() {
    const routerMatch = this.routerMatch && '/' + this.routerMatch;
    const currentRouteUrl = this.router.routerState.snapshot.url;
    const matchingRoutes = routerMatch.split(/\,/);
    let matched = false;
    matchingRoutes.forEach(r => {
      if (r && currentRouteUrl.startsWith(r)) {
        matched = true;
        return;
      }
    });
    if (matched) {
      return this.hasSub ? 'ant-menu-submenu-open' : 'ant-menu-item-selected';
    }
  }
}
