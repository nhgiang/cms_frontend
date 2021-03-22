import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  registeredEventListData = [
    {
      name: 'Kỹ năng làm đẹp 1',
      src: 'assets/images/others/event-1.png',
      title: '20:00 18/12/2020'
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      src: 'assets/images/others/event-2.png',
      title: '20:00 18/12/2020'
    }
  ];

  certificateObtainedListData = [
    {
      name: 'Chăm sóc gia cơ bản',
      src: 'assets/images/others/certificate.png',
      title: 'Beauty Up'
    },
  ];

  itemData = [
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'Đang học',
    },
    {
      name: 'Chăm sóc gia toàn diện',
      lecturer: 'Đỗ Thị Diệu Cầm',
      startDate: '02/12/2020',
      progress: 100,
      status: 'Đã hoàn thành',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'Đang học',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'Đang học',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'Đang học',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
