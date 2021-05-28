import { Routes } from '@angular/router';
import { ConfigQuickContactComponent } from 'src/app/config-quick-contact/config-quick-contact.component';
import { PartnersComponent } from 'src/app/partners/partners.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/user/user.module').then((m) => m.UserModule),
    data: {
      title: 'Quản lý người dùng',
    },
  },
  {
    path: 'content',
    loadChildren: () =>
      import('src/app/content/content.module').then((m) => m.ContentModule),
    data: {
      title: 'Quản lý nội dung website',
    },
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('src/app/contact/contact.module').then((m) => m.ContactModule),
    data: {
      title: 'Quản lý nội dung liên hệ',
    },
  },
  {
    path: 'course-management',
    loadChildren: () =>
      import('src/app/course/course.module').then((m) => m.CourseModule),
    data: {
      title: 'Quản lý khóa học',
    },
  },
  {
    path: 'consulting',
    loadChildren: () =>
      import('src/app/consulting/consulting.module').then(
        (m) => m.ConsultingModule
      ),
    data: {
      headerDisplay: true,
      title: 'Thông tin tư vấn',
    },
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('src/app/blog/blog.module').then((m) => m.BlogModule),
    data: {
      headerDisplay: true,
      title: 'Quản lý bài viết',
    },
  },
  {
    path: 'comment',
    loadChildren: () =>
      import('src/app/comment/comment.module').then((m) => m.CommentModule),
    data: {
      headerDisplay: true,
      title: 'Quản lý comment',
    },
  },
  {
    path: 'event-managerment',
    loadChildren: () =>
      import('src/app/events/events.module').then((m) => m.EventsModule),
    data: {
      headerDisplay: true,
      title: 'Quản lý sự kiện',
    },
  },
  {
    path: 'order-managerment',
    loadChildren: () =>
      import('src/app/order/order.module').then((m) => m.OrderModule),
    data: {
      title: 'Quản lý đơn hàng',
    },
  },
  {
    path: 'quick-contact',
    component: ConfigQuickContactComponent,
    data: {
      title: 'Quản lý chat facebook',
    },
  },
  {
    path: 'partners',
    component: PartnersComponent,
    data: {
      title: 'Danh sách đối tác đăng ký',
    },
  },
];
