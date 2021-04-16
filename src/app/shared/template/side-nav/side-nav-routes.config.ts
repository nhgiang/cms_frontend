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
        path: '',
        title: 'Quản lý khóa học',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: 'book',
        submenu: []
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
                path: 'faq',
                title: 'Câu hỏi thường gặp',
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
