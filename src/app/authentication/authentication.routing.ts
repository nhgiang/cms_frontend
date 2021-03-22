import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'error-404',
    component: Error404Component,
    data: {
      title: 'Error 404'
    }
  },
  {
    path: 'error-500',
    component: Error500Component,
    data: {
      title: 'Error 500'
    }
  }
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
