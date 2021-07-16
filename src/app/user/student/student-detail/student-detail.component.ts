import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseApiService } from '@shared/api/course.api.service';
import { EventApiService } from '@shared/api/event.api.service';
import { StudentApiService } from '@shared/api/student.api.service';
import { UserCertificationApiService } from '@shared/api/user-certificate.api.service';
import { UserApiService } from '@shared/api/user.api.service';
import { StudentCourseStatusOptions } from '@shared/options/student-course-status.options';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EventUserStatusOptions, UserStatus } from 'types/enums';
import { Meta, User } from 'types/typemodel';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  studentStatusOptions = StudentStatusOptions;
  studentCourseStatusOptions = StudentCourseStatusOptions;
  eventStatusOptions = EventUserStatusOptions;
  user: User;
  userId: string;
  metaEvent: Meta;
  metaCourse: Meta;
  metaCertificate: Meta;
  coursePageIndex = 1;
  get btnUserStatus() {
    return this.user && this.user.status === UserStatus.InActive
      ? 'Mở khóa tài khoản'
      : 'Khóa tài khoản';
  }

  get confirmMessage() {
    return this.user && this.user.status === UserStatus.InActive
      ? 'Bạn có chắc chắn muốn mở khóa tài khoản học viên này không?'
      : 'Bạn có chắc chắn muốn khóa tài khoản học viên này không?';
  }
  registeredEventListData = [];
  certificateObtainedListData = [];
  itemData = [];

  constructor(
    private studentApi: StudentApiService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private userApi: UserApiService,
    private courseApi: CourseApiService,
    private eventApi: EventApiService,
    private userCertificateApi: UserCertificationApiService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    forkJoin({
      user: this.getUser(),
      event: this.getEvents({ limit: 100 }),
      course: this.getCourse(),
      certificate: this.getCertificates({ limit: 100 }),
    }).subscribe();
  }

  inActiveAccount(id: string, status: UserStatus) {
    const message = status === UserStatus.Active ? 'Khóa' : 'Mở khóa';
    const next = () => {
      this.user.status =
        status === UserStatus.Active ? UserStatus.InActive : UserStatus.Active;
      this.notification.success(
        'Thành công',
        `${message} tài khoản học viên thành công!`
      );
    };
    const error = (error: HttpErrorResponse) => {
      if (error.status === 412) {
        this.notification.warning('Cảnh báo', error.error.message);
      }
      this.notification.error(
        'Thất bại',
        `${message} tài khoản học viên thất bại!`
      );
    };
    const data = {
      id,
      status:
        status === UserStatus.Active ? UserStatus.InActive : UserStatus.Active,
    };
    this.userApi.updateStatus(id, data).subscribe(next, error);
  }

  getCourse(params = {}) {
    return this.courseApi.getByUser(this.userId, params).pipe(
      tap((res) => {
        this.metaCourse = res.meta;
        this.itemData = res.items;
      })
    );
  }

  getEvents(params = {}) {
    return this.eventApi.getByUser(this.userId, params).pipe(
      map((x) => {
        x.items.forEach((y) => {
          if (moment().isBefore(y.startAt)) {
            y.status = 'Wait';
          } else {
            y.status = moment().isBetween(y.startAt, y.endAt)
              ? 'Happening'
              : 'Done';
          }
          y.startAt = moment(y.startAt).format('HH:mm DD-MM-YYYY');
        });
        return x;
      }),
      tap((res) => {
        this.metaEvent = res.meta;
        this.registeredEventListData = res.items;
      })
    );
  }

  getCertificates(params = {}) {
    return this.userCertificateApi.getByUser(this.userId, params).pipe(
      tap((res) => {
        this.metaCertificate = res.meta;
        this.certificateObtainedListData = res.items;
      })
    );
  }

  getUser() {
    return this.studentApi.getById(this.userId).pipe(
      tap((res) => {
        this.user = res;
      })
    );
  }

  onParamsCourseChanged(event) {
    this.getCourse({ page: event.pageIndex }).subscribe();
  }
}
