import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PartnerPackagesCreateComponent } from './create/partner-packages-create.component';
import { PartnerPackagesListComponent } from './list/partner-packages-list.component';
import { PartnerPackagesRoutes } from './partner-packages.routing';

@NgModule({
  imports: [SharedModule, PartnerPackagesRoutes],
  declarations: [PartnerPackagesCreateComponent, PartnerPackagesListComponent],
})
export class PartnerPackagesModule {}
