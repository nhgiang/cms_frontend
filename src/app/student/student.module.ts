import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentRoutes } from './student.routing';
import { ZorroAntdModule } from '@shared/zorro-antd.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ZorroAntdModule,
    SharedModule,
    StudentRoutes
  ],
  declarations: [StudentComponent]
})
export class StudentModule { }
