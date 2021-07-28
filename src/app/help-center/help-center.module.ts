import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { HelpCenterListComponent } from './help-center-list/help-center-list.component';
import { HelpCenterRoutes } from './help-center.routing';
import { HelpCenterCreateComponent } from './help-center-create/help-center-create.component';
import { HelpCenterEditComponent } from './help-center-edit/help-center-edit.component';


@NgModule({
  declarations: [HelpCenterListComponent, HelpCenterCreateComponent, HelpCenterEditComponent],
  imports: [
    CommonModule,
    HelpCenterRoutes,
    SharedModule,
  ],
})
export class HelpCenterModule { }
