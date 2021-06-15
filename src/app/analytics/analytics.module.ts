import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoursesAnalyticsComponent } from './courses-analytics.component';
import { AnalyticsRoutingModule } from './analytics.routing';
import { RoyaltiesAnalyticsComponent } from './royalties-analytics.component';

@NgModule({
  imports: [SharedModule, CommonModule, AnalyticsRoutingModule],
  declarations: [CoursesAnalyticsComponent, RoyaltiesAnalyticsComponent],
})
export class AnalyticsModule {}
