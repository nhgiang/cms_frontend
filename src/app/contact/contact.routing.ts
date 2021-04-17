import { Routes, RouterModule } from '@angular/router';
import { StoryComponent } from './story/story.component';

const routes: Routes = [
  {
    path: 'story',
    component: StoryComponent,
    data: {
      // headerDisplay: true,
      title: 'Câu truyện'
    }
  }
];

export const ContactRoutes = RouterModule.forChild(routes);
