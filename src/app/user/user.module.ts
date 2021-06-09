import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@shared/shared.module';
import { LecturerCreateComponent } from './lecturer/lecturer-create/lecturer-create.component';
import { LecturerUpdateComponent } from './lecturer/lecturer-update/lecturer-update.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentComponent } from './student/student.component';
import { AssistanceComponent } from './assistance/assistance.component';


@NgModule({
  declarations: [
    StudentComponent,
    StudentDetailComponent,
    LecturerComponent,
    LecturerCreateComponent,
    LecturerUpdateComponent,
    AssistanceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
