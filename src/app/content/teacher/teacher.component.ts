import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { debounceTime, skip, switchMap, takeUntil } from 'rxjs/operators';
import { SettingTeacher } from 'types/typemodel';
import { ContentStateService } from '../content-state.service';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './teacher-update/teacher-update.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [DestroyService],
})
export class TeacherComponent implements OnInit, OnDestroy {
  settingTeachers: SettingTeacher;
  description: FormControl;
  pageIndex = 1;
  destroy$ = new Subject();
  constructor(
    private contentState: ContentStateService,
    private settingApi: SettingApiService,
    private modalService: NzModalService,
    private destroy: DestroyService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.description = new FormControl(null, TValidators.textRange(1, 500));
    this.contentState.setttingTeacher$
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.settingTeachers = res;
        if (this.description.value !== res?.description) {
          this.description.setValue(res?.description);
        }
      });
    this.settingApi.teacher.get().subscribe((res) => {
      this.contentState.initState(res);
    });
    this.description.valueChanges.pipe(skip(1), debounceTime(1000), switchMap(val => {
      return this.contentState.updateDescripton(val.trim());
    })).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật mô tả chung thành công!');
    });
  }

  deleteTeacher(index) {
    this.contentState.deleteTeacher(index).subscribe(() => {
      this.notification.success('Thành công', 'Xóa giảng viên thành công!');
    });
  }

  addItem() {
    this.modalService.create({
      nzTitle: 'Thêm thông tin giảng viên',
      nzContent: TeacherCreateComponent,
    });
  }

  editItem(index: number) {
    this.modalService.create({
      nzTitle: 'Cập nhật thông tin giảng viên',
      nzContent: TeacherUpdateComponent,
      nzComponentParams: { index },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
