import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: {
      title: 'Quản lý học viên',
    }
  },
];

export const StudentRoutes = RouterModule.forChild(routes);
