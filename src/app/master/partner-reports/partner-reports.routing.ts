import { Routes, RouterModule } from '@angular/router';
import { LearnerReportComponent } from './learner-report/learner-report.component';
import { CoursesReportComponent } from './courses-report/courses-report.component';
import { PartnerRevenueReportComponent } from './partner-revenue-report/partner-revenue-report.component';
import { TeacherDiscountReportComponent } from './teacher-discount-report/teacher-discount-report.component';
import { TeacherDiscountReportDetailComponent } from './teacher-discount-report-detail/teacher-discount-report-detail.component';
import { TeacherDetailResolver } from '@shared/services/resolve/teacher-detail.resolver';

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
  {
    path: 'partner-revenue-report',
    component: PartnerRevenueReportComponent,
    data: {
      title: 'Báo cáo doanh thu đối tác',
    },
  },
  {
    path: 'teacher-discount-report',
    data: {
      title: 'Báo cáo chiết khấu giảng viên',
    },
    children: [
      {
        path: '',
        component: TeacherDiscountReportComponent,
      },
      {
        path: ':id',
        component: TeacherDiscountReportDetailComponent,
        resolve: {
          title: TeacherDetailResolver
        },
        data: {}
      }
    ]
  }
];

export const PartnerReportsRoutes = RouterModule.forChild(routes);
