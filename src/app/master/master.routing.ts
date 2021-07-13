import { Routes, RouterModule } from '@angular/router';
import { AuthorizeRoleMasterGuard } from '@shared/guards/authorize-role-master.guard';

const routes: Routes = [
  {
    path: 'partners',
    loadChildren: () =>
      import('src/app/master/partners/partners.module').then(
        (m) => m.PartnersModule
      ),
    data: {
      title: 'Danh sách đối tác',
    },
  },
  {
    path: 'partner-reports',
    loadChildren: () =>
      import('src/app/master/partner-reports/partner-reports.module').then(
        (m) => m.PartnerReportsModule
      ),
    data: {
      title: 'Báo cáo đối tác',
    },
  },
  {
    path: 'submaster',
    canActivate: [AuthorizeRoleMasterGuard],
    loadChildren: () =>
      import('src/app/master/submaster/submaster.module').then(
        (m) => m.SubMasterModule
      ),
    data: {
      title: 'Quản lý sub-master',
    },
  },
];

export const MasterRoutes = RouterModule.forChild(routes);
