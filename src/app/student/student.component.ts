import { Component } from '@angular/core';
import { StudentStatusOptions } from '@shared/options/student-status.options';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  selectedposition: string;
  selectedStatus: string;
  searchInput: any;
  studentStatusOptions = StudentStatusOptions;
  displayData = [];
  productsList = [
    {
      id: 1,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 2,
      name: 'Nguyễn Thị Nhung',
      avatar: 'assets/images/others/student.png',
      position: 'Quản lý spa',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 3,
      name: 'Trần Văn A',
      avatar: 'assets/images/others/student.png',
      position: 'Nhân viên nail',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 4,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'inactive',
      partner: 'Beauty Up'
    },
    {
      id: 5,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'inactive',
      partner: 'Beauty Up'
    },
    {
      id: 6,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 7,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 8,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 9,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
    {
      id: 10,
      name: 'Nguyễn Văn Trung',
      avatar: 'assets/images/others/student.png',
      position: 'NV Chăm sóc gia',
      email: 'trungnv@ttc-solutions.com',
      phone: '0359804444',
      status: 'active',
      partner: 'Beauty Up'
    },
  ];

  constructor() {
    this.displayData = this.productsList;
  }

}
