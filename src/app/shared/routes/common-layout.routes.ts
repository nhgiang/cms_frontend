import { Routes } from '@angular/router';

export const CommonLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'student',
        loadChildren: () => import('src/app/student/student.module').then(m => m.StudentModule),
    },
    {
        path: 'lecturer',
        loadChildren: () => import('src/app/lecturer/lecturer.module').then(m => m.LecturerModule),
    }
];
