import { RouterModule, Routes } from '@angular/router';
import { PartnerPackagesCreateComponent } from './create/partner-packages-create.component';
import { PartnerPackagesListComponent } from './list/partner-packages-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: PartnerPackagesCreateComponent,
    data: {
      title: 'Chi tiết gói sản phẩm',
    },
  },
  {
    path: '',
    component: PartnerPackagesListComponent,
  },
  {
    path: 'edit/:id',
    component: PartnerPackagesCreateComponent,
    data: {
      title: 'Chi tiết gói sản phẩm',
    },
  },
];

export const PartnerPackagesRoutes = RouterModule.forChild(routes);
