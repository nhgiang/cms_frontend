import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SubMasterCreateComponent } from './submaster-create/submaster-create.component';
import { SubMasterUpdateComponent } from './submaster-update/submaster-update.component';
import { SubMasterComponent } from './submaster.component';
import { SubMasterRoutes } from './submaster.routing';

@NgModule({
  imports: [CommonModule, SharedModule, SubMasterRoutes],
  declarations: [
    SubMasterComponent,
    SubMasterUpdateComponent,
    SubMasterCreateComponent,
  ],
})
export class SubMasterModule {}
