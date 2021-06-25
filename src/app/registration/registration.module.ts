import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PartnersRegistrationsComponent } from './partners-registrations/partners-registations.component';
import { RegistrationsRoutes } from './registration.routing';
import { TeacherRegistrationDetailComponent } from './teacher-registration-detail/teacher-registration-detail.component';
import { TeachersRegistrationsComponent } from './teacher-registrations/teacher-registations.component';

@NgModule({
  imports: [SharedModule, RegistrationsRoutes],
  declarations: [
    TeachersRegistrationsComponent,
    PartnersRegistrationsComponent,
    TeacherRegistrationDetailComponent,
  ],
})
export class RegistrationsModule {}
