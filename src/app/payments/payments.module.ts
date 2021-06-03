import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PaymentsRoutes } from './payments.routing';
import { PaymentsComponent } from './payments-list/payments.component';
import { PaymentsCreateComponent } from './payments-create/payments-create.component';
import { PaymentsPreviewComponent } from './payments-preview/payments-preview.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsCreateComponent,
    PaymentsPreviewComponent,
  ],
  imports: [CommonModule, SharedModule, PaymentsRoutes],
})
export class PaymentsModule {}
