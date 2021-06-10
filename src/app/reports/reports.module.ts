import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RevenueComponent } from './revenue/revenue.component';
import { ReportsRoutes } from './reports.routing';
import { NgChartjsModule } from 'ng-chartjs';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutes,
    NgChartjsModule
  ],
  declarations: [RevenueComponent]
})
export class ReportsModule { }
