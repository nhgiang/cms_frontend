import { RouterModule, Routes } from '@angular/router';
import { PartnersCreateComponent } from './partners-create/partners-create.component';
import { PartnersListComponent } from './partners-list/partners-list.component';

const routes: Routes = [
  {
    path: '',
    component: PartnersListComponent
  },
  {
    path: 'create',
    component: PartnersCreateComponent,
    data: {
      title: 'Tạo mới đối tác'
    }
  }
];

export const PartnersRoutes = RouterModule.forChild(routes);
