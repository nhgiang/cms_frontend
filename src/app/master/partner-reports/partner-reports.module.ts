import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerReportComponent } from './learner-report/learner-report.component';
import { PartnerReportsRoutes } from './partner-reports.routing';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [LearnerReportComponent],
  imports: [
    CommonModule,
    PartnerReportsRoutes,
    SharedModule
  ]
})
export class PartnerReportsModule { }
