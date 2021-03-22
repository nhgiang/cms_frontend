import { Routes, RouterModule } from '@angular/router';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: {
      title: 'Quản lý học viên',
    }
  },
  {
    path: ':id',
    component: StudentDetailComponent,
    data: {
      title: 'Thông tin học viên',
    }
  },
];

export const StudentRoutes = RouterModule.forChild(routes);
