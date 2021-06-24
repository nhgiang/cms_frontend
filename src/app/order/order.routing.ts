import { RouterModule, Routes } from '@angular/router';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: 'order',
    data: {
      title: 'Danh sách hóa đơn',
    },
    children: [
      {
        path: '',
        component: OrderListComponent,
      },
      {
        path: 'manual-create',
        component: OrderCreateComponent,
        data: {
          title: 'Tạo hoá đơn',
        },
      },
      {
        path: ':id',
        component: OrderDetailComponent,
        data: {
          title: 'Chi tiết hoá đơn ',
        },
      },
    ],
  },
];

export const OrderRoutes = RouterModule.forChild(routes);
