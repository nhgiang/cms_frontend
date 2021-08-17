import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { NotificationsService } from '@shared/api/notifications.api.service';
import { StudentApiService } from '@shared/api/student.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize, map, switchMap } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserApiService } from '@shared/api/user.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { of } from 'rxjs';
import { MultipleSelectionComponent } from '@shared/controls/multiple-selection/multiple-selection.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  form: FormGroup;
  imageUrl: string;
  isLoading: boolean;
  maxTag = 100;
  options = [];
  @ViewChild('usersSelection') component: MultipleSelectionComponent;
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private notificationsService: NotificationsService,
    private studentApi: StudentApiService,
    private teachersApi: TeacherApiService,
    private notification: NzNotificationService,
    private userApiService: UserApiService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: [null, [TValidators.required, TValidators.maxLength(200)]],
      receivers: [null, [TValidators.required]],
      teacherId: [null],
      content: [null, [TValidators.required]],
    });
    this.form.controls['teacherId'].valueChanges
      .pipe(
        switchMap((value) => {
          if (value) return this.studentApi.getStudentsByTeacher(value);
          else return of([]);
        }),
        map((data: any) =>
          data.map((x) => ({
            label: x.fullName ?? x.email,
            value: x.id,
          }))
        )
      )
      .subscribe((data) => {
        if (data.length) this.options = data;
        else this.component.reset();
        this.form.controls['receivers'].setValue(data.map((x) => x.value));
      });
  }
  submit() {
    const receivers: [] = this.form.controls.receivers.value || [];
    if (receivers.length === 0) {
      this.form.get('receivers').setValue(null);
    } else {
      if (receivers.some((x) => x === 'all')) {
        this.form.get('receivers').setValue([]);
      }
    }
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.notificationsService
      .createNotification(this.form.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((x) => {
        if (x.success) {
          this.notification.success('Thành công', 'Gửi thông báo thành công');
          this.form.reset();
        }
      });
  }

  user$ = (params: any) => {
    return this.userApiService.getAllActive(params).pipe(
      map((data: QueryResult<any>) => {
        data.items.unshift({
          id: 'all',
          fullName: 'Tất cả',
        });
        this.maxTag = data.meta.totalItems;
        return data.items.map((item) => ({
          value: item.id,
          label: item.fullName || item.email,
        })) as Option[];
      })
    );
  };
  teachers$ = (params: any) => {
    return this.teachersApi
      .getList(params)
      .pipe(
        map((res) => res.items.map((x) => ({ value: x.id, label: x.fullName })))
      );
  };
}
