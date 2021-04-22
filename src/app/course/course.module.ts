import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CourseRoutes } from './course.routing';
import { SkillsComponent } from './skills/skills.component';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseTypeCreateComponent } from './course-type/course-type-create/course-type-create.component';
import { CourseTypeEditComponent } from './course-type/course-type-edit/course-type-edit.component';
import { SkillsModalComponent } from './skills/skills-modal/skills-modal.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CreateCourseComponent } from './course-list/create-course/create-course.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { SpecializationsEditComponent } from './specializations/specializations-edit/specializations-edit.component';
import { SpecializationsCreateComponent } from './specializations/specializations-create/specializations-create.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutes
  ],
  declarations: [
    SkillsComponent,
    SkillsModalComponent,
    CourseListComponent,
    CreateCourseComponent,
    CourseTypeComponent,
    CourseTypeCreateComponent,
    CourseTypeEditComponent,
    SpecializationsComponent,
    SpecializationsEditComponent,
    SpecializationsCreateComponent,
  ]
})
export class CourseModule { }
