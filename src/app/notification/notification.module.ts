import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationRoutes } from './notification.routing';
import { SharedModule } from '@shared/shared.module';
import { NotificationCreateComponent } from './notification-create/notification-create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutes,
    SharedModule,
    AngularEditorModule
  ],
  declarations: [NotificationListComponent, NotificationCreateComponent]
})
export class NotificationModule { }
