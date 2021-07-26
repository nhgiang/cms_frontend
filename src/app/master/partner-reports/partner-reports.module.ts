import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerReportComponent } from './learner-report/learner-report.component';
import { PartnerReportsRoutes } from './partner-reports.routing';
import { SharedModule } from '@shared/shared.module';
import { CoursesReportComponent } from './courses-report/courses-report.component';
import { PartnerRevenueReportComponent } from './partner-revenue-report/partner-revenue-report.component';
import { TeacherDiscountReportComponent } from './teacher-discount-report/teacher-discount-report.component';
import { TeacherDiscountReportDetailComponent } from './teacher-discount-report-detail/teacher-discount-report-detail.component';
import { NotePaymentComponent } from './teacher-discount-report/note-payment/note-payment.component';



@NgModule({
  declarations: [LearnerReportComponent, CoursesReportComponent, PartnerRevenueReportComponent, TeacherDiscountReportComponent, TeacherDiscountReportDetailComponent, NotePaymentComponent],
  imports: [
    CommonModule,
    PartnerReportsRoutes,
    SharedModule
  ]
})
export class PartnerReportsModule { }
