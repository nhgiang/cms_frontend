import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VoucherFormComponent } from '../order/voucher/voucher-form/voucher-form.component';
import { VoucherComponent } from '../order/voucher/voucher.component';
import { AdminRoutes } from './admin.routing';
import { SettingMembershipsComponent } from './setting-memberships/setting.memberships.component';

@NgModule({
  imports: [AdminRoutes, SharedModule],
  declarations: [SettingMembershipsComponent,  VoucherComponent, VoucherFormComponent],
})
export class AdminModule {}
