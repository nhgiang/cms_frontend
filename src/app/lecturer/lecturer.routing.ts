import { Routes, RouterModule } from '@angular/router';
import { LecturerComponent } from './lecturer.component';

const routes: Routes = [
  {
    path: '',
    component: LecturerComponent,
    data: {
      title: 'Quản lý giảng viên',
    }
  },
];

export const LecturerRoutes = RouterModule.forChild(routes);
