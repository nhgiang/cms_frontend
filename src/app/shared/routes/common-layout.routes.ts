import { Routes } from '@angular/router';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule),
    data: {
      title: 'Quản lý người dùng'
    },
  },
  {
    path: 'content',
    loadChildren: () => import('src/app/content/content.module').then(m => m.ContentModule),
    data: {
      title: 'Quản lý nội dung website'
    },
  },
  {
    path: 'contact',
    loadChildren: () => import('src/app/contact/contact.module').then(m => m.ContactModule),
    data: {
      title: 'Quản lý nội dung liên hệ'
    }
  },
  {
    path: 'course-management',
    loadChildren: () => import('src/app/course/course.module').then(m => m.CourseModule),
    data: {
      title: 'Quản lý khóa học'
    }
  },
  {
    path: 'consulting',
    loadChildren: () => import('src/app/consulting/consulting.module').then(m => m.ConsultingModule),
    data: {
      headerDisplay: true,
      title: 'Thông tin tư vấn'
    }
  }
];
