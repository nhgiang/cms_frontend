import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {
    path: 'order',
    data: {
      title: 'Danh sách hóa đơn'
    },
    children: [
      {
        path: '',
        component: OrderListComponent,
      },
      {
        path: ':id',
        component: OrderDetailComponent,
        data: {
          title: 'Chi tiết hoá đơn '
        }
      }
    ],
  }
];

export const OrderRoutes = RouterModule.forChild(routes);
