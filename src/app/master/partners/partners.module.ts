import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { PartnersCreateComponent } from './partners-create/partners-create.component';
import { PartnersEditComponent } from './partners-edit/partners-edit.component';
import { PartnersRoutes } from './partners.routing';
import { Step1Component } from './step-1/step-1.component';
import { Step2Component } from './step-2/step-2.component';
import { Step3Component } from './step-3/step-3.component';
import { PartnersExtendTimeComponent } from './partners-extend-time/partners-extend-time.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PartnersRoutes
  ],
  declarations: [
    PartnersListComponent,
    PartnersCreateComponent,
    PartnersExtendTimeComponent, 
    PartnersEditComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ]
})
export class PartnersModule { }
