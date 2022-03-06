import { RouterModule, Routes } from '@angular/router';
import { PaymentMomoComponent } from './payment-momo/payment-momo.component';
import { PaymentsComponent } from './payments-list/payments.component';
import { PaymentsVnpayComponent } from './payments-vnpay/payments-vnpay.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Thông tin ngân hàng',
    },
    component: PaymentsComponent,
  },
  {
    path: 'vnpay',
    data: {
      title: 'Vnpay',
    },
    component: PaymentsVnpayComponent,
  },
  {
    path: 'momo',
    data: {
      title: 'MoMo',
    },
    component: PaymentMomoComponent,
  },
];

export const PaymentsRoutes = RouterModule.forChild(routes);
