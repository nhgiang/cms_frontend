import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentRoutes } from './student.routing';
import { SharedModule } from '@shared/shared.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  imports: [
    SharedModule,
    StudentRoutes
  ],
  declarations: [
    StudentComponent,
    StudentDetailComponent
  ]
})
export class StudentModule { }
