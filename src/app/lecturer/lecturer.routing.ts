import { Routes, RouterModule } from '@angular/router';
import { SpecializationResolver } from '@shared/services/resolve/specialization.resolver';
import { TeacherDetailResolver } from '@shared/services/resolve/teacher-detail.resolver';
import { LecturerCreateComponent } from './lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer-update/lecturer-update.component';
import { LecturerComponent } from './lecturer.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      specializations: SpecializationResolver
    },
    children: [
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
        },
        resolve: {
          teacher: TeacherDetailResolver
        }
      },
    ]
  },
];

export const LecturerRoutes = RouterModule.forChild(routes);
