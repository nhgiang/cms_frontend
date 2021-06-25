import { Routes, RouterModule } from '@angular/router';
import { PartnersRegistrationsComponent } from './partners-registrations/partners-registations.component';
import { TeacherRegistrationDetailComponent } from './teacher-registration-detail/teacher-registration-detail.component';
import { TeachersRegistrationsComponent } from './teacher-registrations/teacher-registations.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeachersRegistrationsComponent,
    data: {
      title: 'Giảng viên đăng kí',
    },
  },
  {
    path: 'partner',
    component: PartnersRegistrationsComponent,
    data: {
      title: 'Học viện đăng ký',
    },
  },
  {
    path: 'teacher/:id',
    component: TeacherRegistrationDetailComponent,
    data: {
      title: 'Chi tiết giảng viên',
    },
  },
];

export const RegistrationsRoutes = RouterModule.forChild(routes);
