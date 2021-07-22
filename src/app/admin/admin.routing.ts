import { RouterModule, Routes } from '@angular/router';
import { SettingMembershipsComponent } from './setting-memberships/setting.memberships.component';

const routes: Routes = [
  {
    path: 'payment-methods',
    loadChildren: () =>
      import('src/app/payments/payments.module').then((m) => m.PaymentsModule),
  },
  {
    path: 'setting-memberships',
    component: SettingMembershipsComponent,
    data: {
      title: 'Cài đặt gói Membership',
    },
  }
];

export const AdminRoutes = RouterModule.forChild(routes);
