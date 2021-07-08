import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { DestroyService } from '@shared/services/destroy.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
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
    private fb: FormBuilder,
    private storageApi: StorageApiService
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

  updateContent() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.form.value.coverAvatar).pipe(
      switchMap(url => {
        this.form.get('coverAvatar').setValue(url);
        return this.contentState.updateContent(this.form.value);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin giảng viên thành công!');
    });
  }

  protected handleResult(result: { res: SettingTeacher; isVisible: boolean; }) {
    this.contentState.initState(result.res);
    this.isVisible = result.isVisible
  }

  protected handleResulVisible() {
    this.notification.success('Thành công', 'Cập nhật thông tin giảng viên thành công!');
  }

  buildForm() {
    this.form = this.fb.group({
      description: [null, TValidators.textRange(1, 500)],
      coverAvatar: [null],
      title: ['Giảng viên']
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
