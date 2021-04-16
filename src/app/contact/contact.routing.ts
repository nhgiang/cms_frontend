import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: 'story',
    component: StoryComponent,
    data: {
      // headerDisplay: true,
      title: 'Câu truyện'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'Về chúng tôi'
    }
  }
];

export const ContactRoutes = RouterModule.forChild(routes);
