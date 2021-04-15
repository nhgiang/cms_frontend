import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthorizeGuard } from '@shared/guards/authorize.guard';
import { CommonLayoutRoutes } from '@shared/routes/common-layout.routes';
import { FullLayoutRoutes } from '@shared/routes/full-layout.routes';
import { Error404Component } from './authentication/error404/error404.component';
import { Error500Component } from './authentication/error500/error500.component';
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
  {
    path: 'error',
    children: [
      {
        path: '404',
        component: Error404Component,
        data: {
          title: 'Error 404'
        }
      },
      {
        path: '500',
        component: Error500Component,
        data: {
          title: 'Error 500'
        }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
});
