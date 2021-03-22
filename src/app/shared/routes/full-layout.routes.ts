import { Routes } from '@angular/router';

export const FullLayoutRoutes: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('src/app/authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];
