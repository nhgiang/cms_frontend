import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentRoutes } from './student.routing';
import { ZorroAntdModule } from '@shared/zorro-antd.module';
import { SharedModule } from '@shared/shared.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  imports: [
    ZorroAntdModule,
    SharedModule,
    StudentRoutes
  ],
  declarations: [
    StudentComponent,
    StudentDetailComponent
  ]
})
export class StudentModule { }
