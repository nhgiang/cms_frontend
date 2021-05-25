import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutes } from './order.routing';
import { OrderDetailComponent } from './order-detail/order-detail.component';



@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutes
  ]
})
export class OrderModule { }
