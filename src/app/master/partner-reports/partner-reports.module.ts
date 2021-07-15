import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerReportComponent } from './learner-report/learner-report.component';
import { PartnerReportsRoutes } from './partner-reports.routing';
import { SharedModule } from '@shared/shared.module';
import { CoursesReportComponent } from './courses-report/courses-report.component';
import { PartnerRevenueReportComponent } from './partner-revenue-report/partner-revenue-report.component';



@NgModule({
  declarations: [LearnerReportComponent, CoursesReportComponent, PartnerRevenueReportComponent],
  imports: [
    CommonModule,
    PartnerReportsRoutes,
    SharedModule
  ]
})
export class PartnerReportsModule { }
