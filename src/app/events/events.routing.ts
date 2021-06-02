import { Routes, RouterModule } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventsOrganizeComponent } from './events-organize/events-organize.component';

const routes: Routes = [
  {
    path: 'event',
    data: {
      title: 'Danh sách sự kiện',
    },
    children: [
      {
        path: '',
        component: EventListComponent,
      },
      {
        path: 'create',
        component: EventCreateComponent,
        data: {
          title: 'Thêm mới sự kiện',
        },
      },
      {
        path: ':id',
        component: EventDetailComponent,
        data: {
          title: 'Cập nhật sự kiện',
        },
      },
    ],
  },
  {
    path: 'organize',
    component: EventsOrganizeComponent,
    data: {
      title: 'Phân loại sự kiện',
    },
  },
];

export const EventsRoutes = RouterModule.forChild(routes);
