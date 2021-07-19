import { RouterModule, Routes } from '@angular/router';
import { HelpCenterCreateComponent } from './help-center-create/help-center-create.component';
import { HelpCenterEditComponent } from './help-center-edit/help-center-edit.component';
import { HelpCenterListComponent } from './help-center-list/help-center-list.component';


const routes: Routes = [
  {
    path: 'help-center',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: HelpCenterListComponent,
        data: {
          title: 'Danh sách bài viết'
        },
      },
      {
        path: 'create',
        component: HelpCenterCreateComponent,
        data: {
          title: 'Thêm mới bài viết'
        },
      },
      {
        path: 'edit/:id',
        component: HelpCenterEditComponent,
        data: {
          title: 'Chi tiết bài viết'
        },
      }
    ],
  }
];

export const HelpCenterRoutes = RouterModule.forChild(routes);
