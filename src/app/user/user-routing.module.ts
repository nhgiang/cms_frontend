import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeByRoleGuard } from '@shared/guards/authorize-by-role.guard';
import { TeacherDetailResolver } from '@shared/services/resolve/teacher-detail.resolver';
import { AssistanceCreateComponent } from './assistance/assistance-create/assistance-create.component';
import { AssistanceUpdateComponent } from './assistance/assistance-update/assistance-update.component';
import { AssistanceComponent } from './assistance/assistance.component';
import { LecturerCreateComponent } from './lecturer/lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer/lecturer-update/lecturer-update.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path: 'student',
    data: {
      title: 'Quản lý học viên'
    },
    children: [
      {
        path: '',
        component: StudentComponent,
      },
      {
        path: ':id',
        component: StudentDetailComponent,
        data: {
          title: 'Thông tin học viên',
        },
      },
    ],
  },
  {
    path: 'lecturer',
    data: {
      title: 'Quản lý giảng viên',
    },
    children: [
      {
        path: '',
        component: LecturerComponent
      },
      {
        path: 'create',
        component: LecturerCreateComponent,
        data: {
          title: 'Tạo mới giảng viên',
        },
      },
      {
        path: ':id',
        component: LecturerUpdateComponent,
        data: {
          title: 'Cập nhật thông tin giảng viên',
        },
        resolve: {
          teacher: TeacherDetailResolver,
        },
      },
    ],
  },
  {
    path: 'assistance',
    data: {
      title: 'Quản lý nhân viên',
    },
    canActivate: [AuthorizeByRoleGuard],
    children: [
      {
        path: '',
        component: AssistanceComponent
      },
      {
        path: 'create',
        component: AssistanceCreateComponent,
        data: {
          title: 'Tạo mới nhân viên',
        },
      },
      {
        path: ':id',
        component: AssistanceUpdateComponent,
        data: {
          title: 'Cập nhật thông tin nhân viên',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
