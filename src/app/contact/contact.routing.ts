import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contact/contact.component';
import { StoryComponent } from './story/story.component';
import { VideoIntroContactComponent } from './video-intro/video-intro.component';

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
    component: VideoIntroContactComponent,
    data: {
      title: 'Video giới thiệu'
    }
  },
  {
    path: 'contact-info',
    component: ContactsComponent,
    data: {
      title: 'Liên hệ'
    }
  }
];

export const ContactRoutes = RouterModule.forChild(routes);
