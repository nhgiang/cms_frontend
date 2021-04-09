import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentApiService } from '@shared/api/student.api.service';
import { UserApiService } from '@shared/api/user.api.service';
import { StudentCourseStatusOptions } from '@shared/options/student-course-status.options';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStatus } from 'types/enums';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  studentStatusOptions = StudentStatusOptions;
  studentCourseStatusOptions = StudentCourseStatusOptions;
  user: User;
  get btnUserStatus() {
    return this.user && this.user.status === UserStatus.InActive ? 'Mở khóa tài khoản' : 'Khóa tài khoản';
  }

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
      status: 'studying',
    },
    {
      name: 'Chăm sóc gia toàn diện',
      lecturer: 'Đỗ Thị Diệu Cầm',
      startDate: '02/12/2020',
      progress: 100,
      status: 'accomplished',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'studying',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'expired',
    },
    {
      name: 'Tập huấn bí kíp tăng trưởng đột phát',
      lecturer: 'Johny Nguyễn',
      startDate: '18/10/2020',
      progress: 30,
      status: 'studying',
    },
  ];

  constructor(
    private studentApi: StudentApiService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private userApi: UserApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentApi.getById(id).subscribe(res => {
      this.user = res;
    });
  }

  inActiveAccount(id, status) {
    const message = status === UserStatus.Active ? 'Khóa' : 'Mở khóa';
    const next = () => {
      this.user.status = status === UserStatus.Active ? UserStatus.InActive : UserStatus.Active;
      this.notification.success('Thành công', `${message} tài khoản học viên thành công!`);
    };
    const error = () => {
      this.notification.success('Thất bại', `${message} tài khoản học viên thất bại!`);
    };
    const data = {
      id,
      status: status === UserStatus.Active ? UserStatus.InActive : UserStatus.Active
    };
    this.userApi.updateStatus(id, data).subscribe(next, error);
  }
}
