import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { DestroyService } from '@shared/services/destroy.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetType } from 'types/enums';
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
  form: FormGroup;
  pageIndex = 1;
  destroy$ = new Subject();
  assetType = AssetType;
  constructor(
    private contentState: ContentStateService,
    private settingApi: SettingApiService,
    private modalService: NzModalService,
    private destroy: DestroyService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.contentState.setttingTeacher$
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.settingTeachers = res;
        this.form.patchValue(res);
      });
    this.settingApi.teacher.get().subscribe((res) => {
      this.contentState.initState(res);
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

  buildForm() {
    this.form = this.fb.group({
      description: [],
      image: [],
      isShow: [],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
