import { RouterModule, Routes } from '@angular/router';
import { PartnersCreateComponent } from './partners-create/partners-create.component';
import { PartnersExtendTimeComponent } from './partners-extend-time/partners-extend-time.component';
import { PartnersListComponent } from './partners-list/partners-list.component';

const routes: Routes = [
  {
    path: '',
    component: PartnersListComponent,
  },
  {
    path: 'create',
    component: PartnersCreateComponent,
    data: {
      title: 'Tạo mới đối tác',
    },
  },
  {
    path: ':id/extension',
    component: PartnersExtendTimeComponent,
    data: {
      title: 'Gia hạn thời gian sử dụng',
    },
  },
];

export const PartnersRoutes = RouterModule.forChild(routes);
