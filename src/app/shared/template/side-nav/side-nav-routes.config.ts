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
    icon: 'profile',
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
    title: 'Quản lý nội dung website',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: [
      {
        path: 'premiums',
        title: 'Ưu đãi',
        submenu: [],
      },
      {
        path: 'footer',
        title: 'Footer',
        submenu: [],
      },
      {
        path: 'feedbacks',
        title: 'Đánh giá học viên',
        submenu: [],
      },
      {
        path: 'video-intro',
        title: 'Video giới thiệu',
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
        path: 'hottest-course',
        title: 'Khóa học hot nhất',
        submenu: [],
      },
    ],
  },
  {
    path: 'contact',
    title: 'Quản lý nội dung liên hệ',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
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
    icon: 'calendar',
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
    path: 'partners-registrations',
    title: 'Đối tác đăng ký',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: [],
  },
  {
    path: 'comment',
    title: 'Quản lý comment',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: [],
  },
  {
    path: 'quick-contact',
    title: 'Quản lý chat facebook',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: [],
  },
  {
    path: 'reports',
    title: 'Báo cáo',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'team',
    submenu: [
      {
        path: 'revenue',
        title: 'Báo cáo doanh thu',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'customer-service',
        submenu: [],
      },
      {
        path: 'courses',
        title: 'Báo cáo khóa học',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'book',
        submenu: [],
      },
      {
        path: 'royalty-rates',
        title: 'Báo cáo chiết khấu',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'fund',
        submenu: [],
      },
    ],
  },
  {
    path: 'payment-methods',
    title: 'Thông tin ngân hàng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'bank',
    isAdminOnly: true,
    submenu: [],
  },
  {
    path: 'settings-help',
    title: 'Cài đặt bài viết hướng dẫn',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: [
      {
        path: 'help-center',
        title: 'Danh sách bài viết',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'customer-service',
        submenu: [],
      },
    ],
  },
];
