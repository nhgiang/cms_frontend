import { SideNavInterface } from '@shared/interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: [],
  },
  {
    path: 'user',
    title: 'Quản lý người dùng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'user',
    submenu: [
      {
        path: 'student',
        title: 'Quản lý học viên',
        submenu: [],
      },
      {
        path: 'lecturer',
        title: 'Quản lý giảng viên',
        submenu: [],
      },
      {
        path: 'assistance',
        title: 'Quản lý nhân viên',
        submenu: [],
        isAdminOnly: true,
      },
      {
        path: 'notification',
        title: 'Thông báo',
        submenu: [],
        isAdminOnly: true,
      },
    ],
  },
  {
    path: 'course-management',
    title: 'Quản lý khóa học',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'book',
    submenu: [
      {
        path: 'course',
        title: 'Danh sách khóa học',
        submenu: [],
      },
      {
        path: 'type',
        title: 'Loại khóa học',
        submenu: [],
      },
      {
        path: 'skills',
        title: 'Kỹ năng đạt được',
        submenu: [],
      },
      {
        path: 'specialization',
        title: 'Chuyên môn',
        submenu: [],
      },
      {
        path: 'certification',
        title: 'Chứng chỉ',
        submenu: [],
      },
    ],
  },
  {
    path: 'consulting',
    title: 'Tư vấn đánh giá',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: [
      {
        path: 'information',
        title: 'Thông tin tư vấn',
        submenu: [],
      },
    ],
  },
  {
    path: 'order-management',
    title: 'Quản lý đơn hàng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'shopping-cart',
    submenu: [
      {
        path: 'order',
        title: 'Danh sách đơn hàng',
        submenu: [],
      },
    ],
  },
  {
    path: 'content',
    title: 'Nội dung website',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'layout',
    submenu: [
      {
        path: 'header',
        title: 'Header',
        submenu: [],
      },
      {
        path: 'video-intro',
        title: 'Video giới thiệu',
        submenu: [],
      },
      {
        path: 'education',
        title: 'Hệ thống khóa học',
        submenu: [],
      },
      {
        path: 'hottest-course',
        title: 'Khóa học hot nhất',
        submenu: [],
      },
      {
        path: 'premiums',
        title: 'Ưu đãi',
        submenu: [],
      },
      {
        path: 'feedbacks',
        title: 'Đánh giá học viên',
        submenu: [],
      },
      {
        path: 'teacher',
        title: 'Giảng viên',
        submenu: [],
      },
      {
        path: 'faq',
        title: 'Câu hỏi thường gặp',
        submenu: [],
      },
      {
        path: 'footer',
        title: 'Footer',
        submenu: [],
      },
    ],
  },
  {
    path: 'contact',
    title: 'Nội dung liên hệ',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'contacts',
    submenu: [
      {
        path: 'video',
        title: 'Video giới thiệu',
        submenu: [],
      },
      {
        path: 'about-us',
        title: 'Về chúng tôi',
        submenu: [],
      },
      {
        path: 'contact-info',
        title: 'Liên hệ',
        submenu: [],
      },
      {
        path: 'story',
        title: 'Câu chuyện',
        submenu: [],
      },
    ],
  },
  {
    path: 'event-management',
    title: 'Quản lý sự kiện',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'calendar',
    submenu: [
      {
        path: 'event',
        title: 'Danh sách sự kiện',
        submenu: [],
      },
      {
        path: 'organize',
        title: 'Phân loại sự kiện',
        submenu: [],
      },
    ],
  },
  {
    path: 'blog',
    title: 'Quản lý bài đăng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'schedule',
    submenu: [
      {
        path: 'type',
        title: 'Loại bài viết',
        submenu: [],
      },
      {
        path: 'blog-management',
        title: 'Danh sách bài viết',
        submenu: [],
      },
      {
        path: 'hottest',
        title: 'Bài viết hot nhất',
        submenu: [],
      },
    ],
  },
  {
    path: 'registrations',
    title: 'Đối tác đăng ký',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'usergroup-add',
    submenu: [
      {
        path: 'teacher',
        title: 'Giảng viên đăng ký',
        submenu: [],
      },
      {
        path: 'partner',
        title: 'Học viện đăng ký',
        submenu: [],
      },
    ],
  },
  {
    path: 'comment',
    title: 'Quản lý comment',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'comment',
    submenu: [],
  },
  {
    path: 'quick-contact',
    title: 'Quản lý chat facebook',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'whats-app',
    submenu: [],
  },
  {
    path: 'reports',
    title: 'Báo cáo',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'audit',
    submenu: [
      {
        path: 'revenue',
        title: 'Báo cáo doanh thu',
        submenu: [],
      },
      {
        path: 'courses',
        title: 'Báo cáo khóa học',
        submenu: [],
      },
      {
        path: 'royalty-rates',
        title: 'Báo cáo chiết khấu',
        submenu: [],
      },
      {
        path: 'occupations',
        title: 'Báo cáo nghề nghiệp',
        submenu: [],
      },
    ],
  },
  {
    path: 'settings-help',
    title: 'Bài viết hướng dẫn',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: [
      {
        path: 'help-center',
        title: 'Danh sách bài viết',
        submenu: [],
      },
    ],
  },
];
