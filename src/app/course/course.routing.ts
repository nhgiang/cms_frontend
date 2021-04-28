import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SkillsComponent } from './skills/skills.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { LessonComponent } from './course-list/lesson/lesson.component';
import { UnitAndTest } from 'types/enums';
import { CreateCourseComponent } from './course-list/create-course/create-course.component';

const routes: Routes = [
  {
    path: 'course',
    children: [
      {
        path: '',
        component: CourseListComponent,
        data: {
          title: 'Danh sách khóa học',
        },
      },
      {
        path: 'create',
        data: {
          title: 'Thêm mới khóa học'
        },
        children: [
          {
            path: '',
            component: CreateCourseComponent
          },
          {
            path: 'lesson/:lessonId',
            children: [
              {
                path: 'unit',
                component: LessonComponent,
                data: {
                  title: 'Thêm bài giảng',
                  data: {
                    type: UnitAndTest.Unit,
                  }
                }
              },
              {
                path: 'unit/:unitId',
                component: LessonComponent,
                data: {
                  title: 'Cập nhật bài giảng',
                }
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: 'skills',
    component: SkillsComponent,
    data: {
      title: 'Danh sách kĩ năng'
    },
  },
  {
    path: 'type',
    component: CourseTypeComponent,
    data: {
      title: 'Danh sách loại khóa học'
    }
  },
  {
    path: 'specialization',
    component: SpecializationsComponent,
    data: {
      title: 'Danh sách chuyên môn'
    }
  }
];

export const CourseRoutes = RouterModule.forChild(routes);
