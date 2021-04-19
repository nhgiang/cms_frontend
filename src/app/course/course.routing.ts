import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent,
    data: {
      title: 'Danh sách kĩ năng'
    }
  },
  {
    path: 'type',
    component: CourseTypeComponent,
    data: {
      title: 'Danh sách loại khóa học'
    }
  }
];

export const CourseRoutes = RouterModule.forChild(routes);
