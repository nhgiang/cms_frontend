import { Routes, RouterModule } from '@angular/router';
import { PartnersRegistrationsComponent } from './partners-registrations/partners-registations.component';
import { TeacherRegistrationDetailComponent } from './teacher-registration-detail/teacher-registration-detail.component';
import { TeachersRegistrationsComponent } from './teacher-registrations/teacher-registations.component';

const routes: Routes = [
  {
    path: 'teacher',
    data: {
      title: 'Giảng viên đăng ký',
    },
    children: [
      {
        path: '',
        component: TeachersRegistrationsComponent
      },
      {
        path: ':id',
        component: TeacherRegistrationDetailComponent,
        data: {
          title: 'Chi tiết giảng viên',
        },
      },
    ]
  },
  {
    path: 'partner',
    component: PartnersRegistrationsComponent,
    data: {
      title: 'Học viện đăng ký',
    },
  },

];

export const RegistrationsRoutes = RouterModule.forChild(routes);
