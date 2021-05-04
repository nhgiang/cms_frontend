import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SkillsComponent } from './skills/skills.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { LessonComponent } from './course-list/lesson/lesson.component';
import { UnitAndTest } from 'types/enums';
import { CreateCourseComponent } from './course-list/create-course/create-course.component';
import { EditCourseComponent } from './course-list/edit-course/edit-course.component';

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
        path: 'edit/:courseId',
        data: {
          title: 'Cập nhật khóa học'
        },
        children: [
          {
            path: '',
            component: EditCourseComponent
          },
          {
            path: 'lesson/:lessonId',
            children: [
              {
                path: 'unit',
                component: LessonComponent,
                data: {
                  title: 'Thêm bài giảng',
                }
              },
              {
                path: 'unit/:unitId/:unitType',
                component: LessonComponent,
                data: {
                  title: 'Cập nhật bài giảng',
                }
              }
            ]
          },
        ]
      },
      {
        path: 'create',
        component: CreateCourseComponent,
        data: {
          title: 'Thêm mới khóa học'
        },
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
