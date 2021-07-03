import { Routes, RouterModule } from '@angular/router';
import { LearnerReportComponent } from './learner-report/learner-report.component';

const routes: Routes = [
  {
    path: 'learner-report',
    component: LearnerReportComponent,
    data: {
      title: 'Báo cáo tổng quan học viên'
    }
  }
];

export const PartnerReportsRoutes = RouterModule.forChild(routes);
