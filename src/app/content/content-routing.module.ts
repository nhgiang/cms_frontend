import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { HottestCourseComponent } from './hottest-course/hottest-course.component';
import { PremiumsComponent } from './premiums/premiums.component';
import { SettingHeaderComponent } from './setting-header/setting-header.component';
import { TeacherComponent } from './teacher/teacher.component';
import { VideoIntroComponent } from './video-intro/video-intro.component';

const routes: Routes = [
  {
    path: 'premiums',
    component: PremiumsComponent,
    data: {
      title: 'Ưu đãi'
    }
  },
  {
    path: 'footer',
    component: FooterComponent,
    data: {
      title: 'Footer'
    }
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      title: 'Câu hỏi thường gặp'
    }
  },
  {
    path: 'feedbacks',
    component: FeedbackComponent,
    data: {
      title: 'Đánh giá học viên'
    }
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    data: {
      title: 'Giảng viên'
    }
  },
  {
    path: 'video-intro',
    component: VideoIntroComponent,
    data: {
      title: 'Video giới thiệu'
    }
  },
  {
    path: 'hottest-course',
    component: HottestCourseComponent,
    data: {
      title: 'Khóa học hot nhất'
    }
  },
  {
    path: 'header',
    component: SettingHeaderComponent,
    data: {
      title: 'Header'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
