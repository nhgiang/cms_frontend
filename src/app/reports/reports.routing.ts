import { Routes, RouterModule } from '@angular/router';
import { RevenueComponent } from './revenue/revenue.component';

const routes: Routes = [
  {
    path: 'revenue',
    component: RevenueComponent,
    data: {
      title: 'Báo cáo doanh thu'
    }
  },
];

export const ReportsRoutes = RouterModule.forChild(routes);
