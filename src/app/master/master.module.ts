import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersModule } from './partners/partners.module';
import { SharedModule } from '@shared/shared.module';
import { MasterRoutes } from './master.routing';

@NgModule({
  imports: [
    CommonModule,
    PartnersModule,
    SharedModule,
    MasterRoutes
  ],
  declarations: []
})
export class MasterModule { }
