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
  },
  {
    path: 'contact',
    loadChildren: () => import('src/app/contact/contact.module').then(m => m.ContactModule),
    data: {
      title: 'Quản lí nội dung liên hệ'
    }
  },
  {
    path: 'course',
    loadChildren: () => import('src/app/course/course.module').then(m => m.CourseModule),
    data: {
      title: 'Quản lí khóa học'
    }
  }
];
