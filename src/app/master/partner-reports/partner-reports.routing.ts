import { Routes, RouterModule } from '@angular/router';
import { LearnerReportComponent } from './learner-report/learner-report.component';
import { CoursesReportComponent } from './courses-report/courses-report.component';

const routes: Routes = [
  {
    path: 'learner-report',
    component: LearnerReportComponent,
    data: {
      title: 'Báo cáo tổng quan học viên',
    },
  },
  {
    path: 'courses-report',
    component: CoursesReportComponent,
    data: {
      title: 'Báo cáo tổng quan thông tin khóa học',
    },
  },
];

export const PartnerReportsRoutes = RouterModule.forChild(routes);
