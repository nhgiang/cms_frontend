import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultingInformationComponent } from './consulting-information/consulting-information.component';

const routes: Routes = [
  {
    path: 'information',
    component: ConsultingInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingRoutingModule { }
