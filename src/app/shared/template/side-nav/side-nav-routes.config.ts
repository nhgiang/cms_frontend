import { SideNavInterface } from '@shared/interfaces/side-nav.type';

export const ROUTES: SideNavInterface[] = [
  {
    path: '',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'dashboard',
    submenu: []
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
        submenu: []
      },
      {
        path: 'lecturer',
        title: 'Quản lý giảng viên',
        submenu: []
      },
    ]
  },
  {
    path: 'course',
    title: 'Quản lý khóa học',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'book',
    submenu: [
      {
        path: '',
        title: 'Chi tiết khóa học',
        submenu: []
      },
      {
        path: '',
        title: 'Loại khóa học',
        submenu: []
      },
      {
        path: 'skills',
        title: 'Kỹ năng đạt được',
        submenu: []
      },
      {
        path: '',
        title: 'Template chứng chỉ',
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Tư vấn đánh giá',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: []
  },
  {
    path: '',
    title: 'Đơn hàng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: []
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
        submenu: []
      },
      {
        path: 'footer',
        title: 'Footer',
        submenu: []
      },
      {
        path: 'feedbacks',
        title: 'Đánh giá học viên',
        submenu: []
      },
      {
        path: 'video-intro',
        title: 'Video giới thiệu',
        submenu: []
      },
      {
        path: 'teacher',
        title: 'Giảng viên',
        submenu: []
      },
      {
        path: 'faq',
        title: 'Câu hỏi thường gặp',
        submenu: []
      },
    ]
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
        title: 'Video Intro',
        submenu: []
      },
      {
        path: 'about-us',
        title: 'Về chúng tôi',
        submenu: []
      },
      {
        path: 'contact-management',
        title: 'Liên hệ',
        submenu: []
      },
      {
        path: 'story',
        title: 'Câu truyện',
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Quản lý sự kiện',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'calendar',
    submenu: []
  },
  {
    path: '',
    title: 'Quản lý bài đăng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'calendar',
    submenu: []
  },
  {
    path: '',
    title: 'Quản lý đối tác',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: []
  }
];
