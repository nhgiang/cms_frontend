import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayout_ROUTES
  },
];

export const AppRoutes = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
});
