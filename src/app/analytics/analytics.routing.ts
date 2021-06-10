import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesAnalyticsComponent } from './courses-analytics.component';
const routes: Routes = [
  {
    path: 'courses',
    component: CoursesAnalyticsComponent,
    data: {
      title: 'Báo cáo khóa học',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
