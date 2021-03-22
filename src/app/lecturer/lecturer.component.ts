import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent implements OnInit {

  displayData = [];
  productsList = [
    {
      id: 1,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 2,
      name: 'Nguyễn Thị Nhung',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 3,
      name: 'Trần Văn A',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 4,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 5,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 6,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 7,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 8,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 9,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
    {
      id: 10,
      name: 'Jenny Nguyễn',
      avatar: 'assets/images/others/student.png',
      specialization: 'Chuyên gia thẩm mỹ',
      email: 'jennynguyen@beautyup.com',
      phone: '0359804444',
      description: '8 năm kinh ngiệm trong lĩnh vực makeup',
      checked: 'Beauty Up'
    },
  ];

  constructor() { }

  ngOnInit() {
    this.displayData = this.productsList;
  }

}
