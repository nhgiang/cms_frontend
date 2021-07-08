import { Routes, RouterModule } from '@angular/router';

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
  }
];

export const MasterRoutes = RouterModule.forChild(routes);
