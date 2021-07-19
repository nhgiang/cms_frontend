import { Routes, RouterModule } from '@angular/router';
import { CourseTypeComponent } from './course-type/course-type.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SkillsComponent } from './skills/skills.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { LessonComponent } from './course-list/lesson/lesson.component';
import { CreateCourseComponent } from './course-list/create-course/create-course.component';
import { EditCourseComponent } from './course-list/edit-course/edit-course.component';
import { CertificationComponent } from './certification/certification.component';

const routes: Routes = [
  {
    path: 'course',
    data: {
      title: 'Danh sách khóa học',
    },
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
                  title: 'Thêm bài học',
                }
              },
              {
                path: 'unit/:unitId/:unitType',
                component: LessonComponent,
                data: {
                  title: 'Cập nhật bài học',
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
      title: 'Danh sách kỹ năng'
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
  },
  {
    path: 'certification',
    component: CertificationComponent,
    data: {
      title: 'Chứng chỉ'
    }
  }
];

export const CourseRoutes = RouterModule.forChild(routes);
