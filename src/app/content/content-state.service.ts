import { Injectable } from '@angular/core';
import { SettingApiService } from '@shared/api/setting.api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingTeacher } from 'types/typemodel';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {
  // tslint:disable-next-line: variable-name
  private readonly _setttingTeacher = new BehaviorSubject<SettingTeacher>(null);
  readonly setttingTeacher$: Observable<SettingTeacher> = this._setttingTeacher.asObservable();

  constructor(private settingApi: SettingApiService) { }

  get setttingTeacher() {
    return this._setttingTeacher.getValue();
  }

  private set settingTeachers(val) {
    this._setttingTeacher.next(val);
  }

  initState(data: SettingTeacher) {
    this.settingTeachers = data;
  }

  createTeacher(teacher) {
    const newSettingTeacherState = {
      description: this.setttingTeacher.description,
      teachers: Object.assign({}, this.setttingTeacher.teachers, teacher)
    };
    this.settingApi.teacher.post(newSettingTeacherState).subscribe(() => this.settingTeachers = newSettingTeacherState);
  }

  deleteTeacher(index) {
    const newSettingTeacherState = {
      description: this.setttingTeacher.description,
      teachers: [...this.setttingTeacher.teachers.slice(0, index), ...this.setttingTeacher.teachers.slice(index + 1)]
    };
    this.settingApi.teacher.post(newSettingTeacherState).subscribe(() => this.settingTeachers = newSettingTeacherState);
  }
}
