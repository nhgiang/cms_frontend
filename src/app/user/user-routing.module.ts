import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecializationResolver } from '@shared/services/resolve/specialization.resolver';
import { TeacherDetailResolver } from '@shared/services/resolve/teacher-detail.resolver';
import { LecturerCreateComponent } from './lecturer/lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer/lecturer-update/lecturer-update.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: 'student',
    children: [
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
    ]
  },
  {
    path: 'lecturer',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
