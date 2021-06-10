import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutes } from './order.routing';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutes
  ]
})
export class OrderModule { }
