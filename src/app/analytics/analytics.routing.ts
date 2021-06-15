import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesAnalyticsComponent } from './courses-analytics.component';
import { RoyaltiesAnalyticsComponent } from './royalties-analytics.component';
const routes: Routes = [
  {
    path: 'courses',
    component: CoursesAnalyticsComponent,
    data: {
      title: 'Báo cáo khóa học',
    },
  },
  {
    path: 'royalty-rates', //fix lai,
    component: RoyaltiesAnalyticsComponent,
    data: {
      title: 'Báo cáo chiết khấu',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
