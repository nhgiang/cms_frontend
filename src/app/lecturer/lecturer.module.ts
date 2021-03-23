import { NgModule } from '@angular/core';
import { LecturerComponent } from './lecturer.component';
import { LecturerRoutes } from './lecturer.routing';
import { SharedModule } from '@shared/shared.module';
import { LecturerCreateComponent } from './lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer-update/lecturer-update.component';

@NgModule({
  imports: [
    SharedModule,
    LecturerRoutes
  ],
  declarations: [
    LecturerComponent,
    LecturerCreateComponent,
    LecturerUpdateComponent
  ]
})
export class LecturerModule { }
