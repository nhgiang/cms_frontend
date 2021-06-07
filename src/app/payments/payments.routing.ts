<<<<<<< HEAD
// learn more about routing & lazy-load strategy
=======
>>>>>>> payments
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments-list/payments.component';
import { PaymentsUpsertComponent } from './payments-upsert/payments-upsert.component';
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
];

export const PaymentsRoutes = RouterModule.forChild(routes);
