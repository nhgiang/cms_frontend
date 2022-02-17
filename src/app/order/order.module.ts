import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutes } from './order.routing';
import { VoucherComponent } from './voucher/voucher.component';
import { VoucherFormComponent } from './voucher/voucher-form/voucher-form.component';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent, OrderCreateComponent, VoucherComponent, VoucherFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutes
  ]
})
export class OrderModule { }
