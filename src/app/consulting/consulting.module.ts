import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingRoutingModule } from './consulting-routing.module';
import { ConsultingInformationComponent } from './consulting-information/consulting-information.component';
import { SharedModule } from '@shared/shared.module';
import { ConsultingInformationEditComponent } from './consulting-information/consulting-information-edit/consulting-information-edit.component';


@NgModule({
  declarations: [ConsultingInformationComponent, ConsultingInformationEditComponent],
  imports: [
    CommonModule,
    ConsultingRoutingModule,
    SharedModule
  ]
})
export class ConsultingModule { }
