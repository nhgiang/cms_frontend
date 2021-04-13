import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SettingTeacher } from 'types/typemodel';
import { ContentStateService } from '../content-state.service';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  settingTeachers: SettingTeacher;
  description: FormControl;
  pageIndex = 1;
  constructor(
    private contentState: ContentStateService,
    private settingApi: SettingApiService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.description = new FormControl(null, TValidators.textRange(1, 500));
    this.contentState.setttingTeacher$.subscribe(res => {
      this.settingTeachers = res;
      this.description.setValue(res?.description);
    });
    this.settingApi.teacher.get().subscribe(res => {
      this.contentState.initState(res);
    });
  }

  deleteTeacher(index) {
    this.contentState.deleteTeacher(index);
  }

  addItem() {
    this.modalService.create({
      nzTitle: 'Thêm thông tin giảng viên',
      nzContent: TeacherCreateComponent
    });
  }
}
