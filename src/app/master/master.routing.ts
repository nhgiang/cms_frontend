import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'partners',
    loadChildren: () =>
      import('src/app/partners/partners.module').then(
        (m) => m.PartnersModule
      ),
    data: {
      title: 'Danh sách đối tác',
    },
  }
];

export const MasterRoutes = RouterModule.forChild(routes);
