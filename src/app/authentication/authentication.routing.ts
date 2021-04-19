import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'reset-password/:email',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot password?'
    }
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
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
