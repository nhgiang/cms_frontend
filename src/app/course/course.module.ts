import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CourseRoutes } from './course.routing';
import { SkillsComponent } from './skills/skills.component';
import { SkillsModalComponent } from './skills/skills-modal/skills-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CourseRoutes
  ],
  declarations: [SkillsComponent, SkillsModalComponent]
})
export class CourseModule { }
