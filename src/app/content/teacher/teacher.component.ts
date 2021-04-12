import { Component, OnInit } from '@angular/core';
import { SettingApiService } from '@shared/api/setting.api.service';
import { SettingTeacher } from 'types/typemodel';
import { ContentStateService } from '../content-state.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teachers: SettingTeacher;

  constructor(
    private contentState: ContentStateService,
    private settingApi: SettingApiService
  ) {
  }

  ngOnInit(): void {
    this.contentState.teachers.subscribe(res => this.teachers = res);
    this.settingApi.teacher.get().subscribe(res => {
      this.contentState.initState(res);
    });
  }

  deleteTeacher(index) {

  }
}
