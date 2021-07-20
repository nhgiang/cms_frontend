import { Routes, RouterModule } from '@angular/router';
import { NotificationCreateComponent } from './notification-create/notification-create.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

const routes: Routes = [
  { path: '', component: NotificationListComponent },
  { path: 'create', component: NotificationCreateComponent, data: { title: 'Thêm mới thông báo' } }
];

export const NotificationRoutes = RouterModule.forChild(routes);
