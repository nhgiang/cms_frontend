import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { HelpCenterListComponent } from './help-center-list/help-center-list.component';
import { HelpCenterRoutes } from './help-center.routing';
import { HelpCenterCreateComponent } from './help-center-create/help-center-create.component';
import { HelpCenterEditComponent } from './help-center-edit/help-center-edit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@shared/interceptor/token.interceptor';


@NgModule({
  declarations: [HelpCenterListComponent, HelpCenterCreateComponent, HelpCenterEditComponent],
  imports: [
    CommonModule,
    HelpCenterRoutes,
    SharedModule,
    AngularEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    },
  ]
})
export class HelpCenterModule { }
