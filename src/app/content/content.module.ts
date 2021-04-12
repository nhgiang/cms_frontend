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


@NgModule({
  declarations: [
    PremiumsComponent,
    FooterComponent,
    FaqComponent,
    FeedbackComponent,
    FeedbackCreateComponent,
    FeedbackUpdateComponent,
    TeacherComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule
  ]
})
export class ContentModule { }
