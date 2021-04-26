import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { StoryComponent } from './story/story.component';
import { VideoIntroComponent } from './video-intro/video-intro.component';

const routes: Routes = [
  {
    path: 'story',
    component: StoryComponent,
    data: {
      title: 'Câu chuyện'
    }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: {
      title: 'Về chúng tôi'
    }
  },
  {
    path: 'video',
    component: VideoIntroComponent,
    data: {
      title: 'Video giới thiệu'
    }
  }
];

export const ContactRoutes = RouterModule.forChild(routes);
