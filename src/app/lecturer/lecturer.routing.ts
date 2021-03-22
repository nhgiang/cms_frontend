import { Routes, RouterModule } from '@angular/router';
import { LecturerCreateComponent } from './lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer-update/lecturer-update.component';
import { LecturerComponent } from './lecturer.component';

const routes: Routes = [
  {
    path: '',
    component: LecturerComponent,
    data: {
      title: 'Quản lý giảng viên',
    }
  },
  {
    path: 'create',
    component: LecturerCreateComponent,
    data: {
      title: 'Tạo mới giảng viên',
    }
  },
  {
    path: ':id',
    component: LecturerUpdateComponent,
    data: {
      title: 'Cập nhật thông tin giảng viên',
    }
  },
];

export const LecturerRoutes = RouterModule.forChild(routes);
