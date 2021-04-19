import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: '',
        redirectTo: 'skills'
      },
      {
        path: 'skills',
        component: SkillsComponent
      }
    ]
  },
];

export const CourseRoutes = RouterModule.forChild(routes);
