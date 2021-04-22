import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CreateCourseComponent } from './course-list/create-course/create-course.component';
import { SkillsComponent } from './skills/skills.component';

const routes: Routes = [
  {
    path: 'list',
    component: CourseListComponent,
    data: {
      title: 'Danh sách khóa học',
    },
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: {
      title: 'Danh sách kĩ năng'
    },
  },
  {
    path: 'create',
    component: CreateCourseComponent,
    data: {
      title: 'Tạo mới khóa học',
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
