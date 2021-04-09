import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { PremiumsComponent } from './premiums/premiums.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
