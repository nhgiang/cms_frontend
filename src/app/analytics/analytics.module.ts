import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoursesAnalyticsComponent } from './courses-analytics.component';
import { AnalyticsRoutingModule } from './analytics.routing';

@NgModule({
  imports: [SharedModule, CommonModule, AnalyticsRoutingModule],
  declarations: [CoursesAnalyticsComponent],
})
export class AnalyticsModule {}
