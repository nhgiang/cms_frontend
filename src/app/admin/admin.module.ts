import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutes } from './admin.routing';
import { SettingMembershipsComponent } from './setting-memberships/setting.memberships.component';

@NgModule({
  imports: [CommonModule, AdminRoutes, SharedModule],
  declarations: [SettingMembershipsComponent],
})
export class AdminModule {}
