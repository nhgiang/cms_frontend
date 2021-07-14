import { RouterModule, Routes } from '@angular/router';
import { SubMasterCreateComponent } from './submaster-create/submaster-create.component';
import { SubMasterUpdateComponent } from './submaster-update/submaster-update.component';
import { SubMasterComponent } from './submaster.component';

const routes: Routes = [
  {
    path: '',
    component: SubMasterComponent,
  },
  {
    path: 'create',
    component: SubMasterCreateComponent,
    data: {
      title: 'Tạo mới sub-master',
    },
  },
  {
    path: ':id',
    component: SubMasterUpdateComponent,
    data: {
      title: 'Cập nhật thông tin sub-master',
    },
  },
];

export const SubMasterRoutes = RouterModule.forChild(routes);
