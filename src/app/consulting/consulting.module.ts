import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultingRoutingModule } from './consulting-routing.module';
import { ConsultingInformationComponent } from './consulting-information/consulting-information.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ConsultingInformationComponent],
  imports: [
    CommonModule,
    ConsultingRoutingModule,
    SharedModule
  ]
})
export class ConsultingModule { }
