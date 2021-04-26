import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentRoutingModule } from './content-routing.module';
import { PremiumsComponent } from './premiums/premiums.component';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackCreateComponent } from './feedback/feedback-create/feedback-create.component';
import { FeedbackUpdateComponent } from './feedback/feedback-update/feedback-update.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherCreateComponent } from './teacher/teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './teacher/teacher-update/teacher-update.component';
import { VideoIntroComponent } from './video-intro/video-intro.component';


@NgModule({
  declarations: [
    PremiumsComponent,
    FooterComponent,
    FaqComponent,
    FeedbackComponent,
    FeedbackCreateComponent,
    FeedbackUpdateComponent,
    TeacherComponent,
    TeacherCreateComponent,
    TeacherUpdateComponent,
    VideoIntroComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule
  ]
})
export class ContentModule { }
