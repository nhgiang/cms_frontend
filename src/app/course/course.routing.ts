import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent,
    data: {
      title: 'Danh sách kĩ năng'
    }
  }
];

export const CourseRoutes = RouterModule.forChild(routes);
