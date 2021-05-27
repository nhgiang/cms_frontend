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
    path: 'course-management',
    title: 'Quản lý khóa học',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'book',
    submenu: [
      {
        path: 'course',
        title: 'Danh sách khóa học',
        submenu: []
      },
      {
        path: 'type',
        title: 'Loại khóa học',
        submenu: []
      },
      {
        path: 'skills',
        title: 'Kỹ năng đạt được',
        submenu: []
      },
      {
        path: 'specialization',
        title: 'Chuyên môn',
        submenu: []
      },
      {
        path: 'certification',
        title: 'Chứng chỉ',
        submenu: []
      },
    ]
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
        submenu: []
      },
    ]
  },
  {
    path: 'order-managerment',
    title: 'Quản lý đơn hàng',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'profile',
    submenu: [
      {
        path: 'order',
        title: 'Danh sách đơn hàng',
        submenu: []
      }
    ]
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
      {
        path: 'hottest-course',
        title: 'Khóa học hot nhất',
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
        title: 'Video giới thiệu',
        submenu: []
      },
      {
        path: 'about-us',
        title: 'Về chúng tôi',
        submenu: []
      },
      {
        path: 'story',
        title: 'Câu chuyện',
        submenu: []
      }
    ]
  },
  {
    path: 'events',
    title: 'Quản lý sự kiện',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'calendar',
    submenu: [
      {
        path: 'list',
        title: 'Danh sách sự kiện', 
        submenu: []
      },
      {
        path: 'organize', 
        title: 'Phân loại sự kiện',
        submenu: []
      } 
    ]
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
        submenu: []
      },
      {
        path: 'blog-management',
        title: 'Danh sách bài viết',
        submenu: []
      },
      {
        path: 'hottest',
        title: 'Bài viết hot nhất',
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Quản lý đối tác',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: []
  },
  {
    path: 'quick-contact',
    title: 'Quản lý chat facebook',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: 'customer-service',
    submenu: []
  }
];
