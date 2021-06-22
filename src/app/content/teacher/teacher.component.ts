import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { DestroyService } from '@shared/services/destroy.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
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
export class TeacherComponent extends SettingContainer<SettingTeacher> implements OnInit, OnDestroy {
  settingTeachers: SettingTeacher;
  form: FormGroup;
  pageIndex = 1;
  destroy$ = new Subject();
  assetType = AssetType;

  constructor(
    settingApi: SettingApiService<SettingTeacher>,
    settingVisibleApi: SettingVisibleApiService,
    private contentState: ContentStateService,
    private modalService: NzModalService,
    private destroy: DestroyService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {
    super(settingVisibleApi, settingApi, SettingKey.Teacher, SettingKeyEndPoint.Teacher)
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.contentState.setttingTeacher$
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.settingTeachers = res;
        this.form.patchValue(res);
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


  protected handleResult(result: { res: SettingTeacher; isVisible: boolean; }) {
    this.contentState.initState(result.res);
    this.isVisible = result.isVisible
  }

  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }

  buildForm() {
    this.form = this.fb.group({
      description: [],
      coverAvatar: [],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
