import { Routes } from '@angular/router';

export const CommonLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'user',
        loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule)
    },
    {
        path: 'content',
        loadChildren: () => import('src/app/content/content.module').then(m => m.ContentModule)
    }
];
