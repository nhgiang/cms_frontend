import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CommentComponent } from './comment.component';
import { CommentRoutes } from './comment.routing';
import { DetailCourseCommentComponent } from './detail-course-comment/detail-course-comment.component';
import { SingleCommentComponent } from './detail-course-comment/single-comment/single-comment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommentRoutes
  ],
  declarations: [CommentComponent, DetailCourseCommentComponent, SingleCommentComponent]
})
export class CommentModule { }
