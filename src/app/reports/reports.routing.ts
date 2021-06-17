import { Routes, RouterModule } from '@angular/router';
import { CoursesAnalyticsComponent } from './courses/courses-analytics.component';
import { DetailRevenueComponent } from './revenue/detail-revenue/detail-revenue.component';
import { RevenueComponent } from './revenue/revenue.component';
import { RoyaltiesAnalyticsComponent } from './royalties/royalties-analytics.component';

const routes: Routes = [
  {
    path: 'revenue',
    data: {
      title: 'Báo cáo doanh thu',
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
          title: 'Báo cáo chi tiết',
        },
      },
    ],
  },
  {
    path: 'courses',
    data: {
      title: 'Báo cáo khóa học',
    },
    component: CoursesAnalyticsComponent,
  },
  {
    path: 'royalty-rates',
    data: {
      title: 'Báo cáo chiết khấu',
    },
    component: RoyaltiesAnalyticsComponent,
  },
];

export const ReportsRoutes = RouterModule.forChild(routes);
