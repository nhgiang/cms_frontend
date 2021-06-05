// learn more about routing & lazy-load strategy
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments-list/payments.component';
import { PaymentsCreateComponent } from './payments-create/payments-create.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Phương thức thanh toán',
    },
    component: PaymentsComponent,
  },
  {
    path: 'create',
    data: {
      title: 'Thêm phương thức thanh toán',
    },
    component: PaymentsCreateComponent,
  },
];

export const PaymentsRoutes = RouterModule.forChild(routes);
