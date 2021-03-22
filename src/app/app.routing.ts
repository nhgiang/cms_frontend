import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthorizeGuard } from '@shared/guards/authorize.guard';
import { CommonLayoutRoutes } from '@shared/routes/common-layout.routes';
import { FullLayoutRoutes } from '@shared/routes/full-layout.routes';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    canActivate: [AuthorizeGuard],
    children: CommonLayoutRoutes
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayoutRoutes
  },
];

export const AppRoutes = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
});
