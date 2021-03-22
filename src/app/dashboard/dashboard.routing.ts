import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    data: {
      title: 'Dashboard ',
    }
  }
];

export const DashboardRoutes = RouterModule.forChild(routes);
