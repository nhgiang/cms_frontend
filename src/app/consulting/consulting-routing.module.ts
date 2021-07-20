import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultingInformationEditComponent } from './consulting-information/consulting-information-edit/consulting-information-edit.component';
import { ConsultingInformationComponent } from './consulting-information/consulting-information.component';

const routes: Routes = [
  {
    path: 'information',
    data: {
      title: 'Thông tin tư vấn'
    },
    children: [
      {
        path: '',
        component: ConsultingInformationComponent,
      },
      {
        path: ':id',
        component: ConsultingInformationEditComponent,
        data: {
          title: 'Thông tin khách hàng'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingRoutingModule { }
