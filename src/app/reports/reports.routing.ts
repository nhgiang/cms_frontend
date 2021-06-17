import { Routes, RouterModule } from '@angular/router';
import { DetailRevenueComponent } from './revenue/detail-revenue/detail-revenue.component';
import { RevenueComponent } from './revenue/revenue.component';

const routes: Routes = [
  {
    path: 'revenue',
    data: {
      title: 'Báo cáo doanh thu'
    },
    children: [
      {
        path: '',
        component: RevenueComponent,
      },
      {
        path: 'detail',
        component: DetailRevenueComponent,
        data: {
          title: 'Báo cáo chi tiết'
        }
      }
    ]
  },
];

export const ReportsRoutes = RouterModule.forChild(routes);
