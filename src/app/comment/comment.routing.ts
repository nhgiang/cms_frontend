import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment.component';
import { DetailCourseCommentComponent } from './detail-course-comment/detail-course-comment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Danh sách comment'
    },
    children: [
      {
        path: '',
        component: CommentComponent
      },
      {
        path: ':id',
        component: DetailCourseCommentComponent,
        data: {
          title: 'Chi tiết comment'
        }
      },
    ]
  }
];

export const CommentRoutes = RouterModule.forChild(routes);
