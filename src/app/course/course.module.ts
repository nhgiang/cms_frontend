import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CourseRoutes } from './course.routing';
import { SkillsComponent } from './skills/skills.component';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseTypeCreateComponent } from './course-type/course-type-create/course-type-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutes
  ],
  declarations: [SkillsComponent, CourseTypeComponent, CourseTypeCreateComponent]
})
export class CourseModule { }
