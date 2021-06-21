import { Injectable } from '@angular/core';
import { SettingApiService } from '@shared/api/setting.api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingTeacher, SettingTeacherItem } from 'types/typemodel';

@Injectable({
  providedIn: 'root',
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

  createTeacher(teacher: SettingTeacherItem) {
    const newSettingTeacherState = {
      description: this.setttingTeacher.description,
      image: this.setttingTeacher.image,
      teachers: [...this.setttingTeacher.teachers, teacher],
    };
    return this.settingApi.teacher
      .post(newSettingTeacherState)
      .pipe(tap(() => (this.settingTeachers = newSettingTeacherState)));
  }

  updateTeacher(teacher: SettingTeacherItem, index: number) {
    const newSettingTeacherState = {
      description: this.setttingTeacher.description,
      image: this.setttingTeacher.image,
      teachers: [...this.setttingTeacher.teachers],
    };
    newSettingTeacherState.teachers[index] = teacher;
    return this.settingApi.teacher
      .post(newSettingTeacherState)
      .pipe(tap(() => (this.settingTeachers = newSettingTeacherState)));
  }

  updateDescripton(body: { description: string, image: string }) {
    const newSettingTeacherState = {
      ...body,
      teachers: [...this.setttingTeacher.teachers],
    };
    return this.settingApi.teacher.post(newSettingTeacherState);
  }

  deleteTeacher(index) {
    const newSettingTeacherState = {
      description: this.setttingTeacher.description,
      image: this.setttingTeacher.image,
      teachers: [
        ...this.setttingTeacher.teachers.slice(0, index),
        ...this.setttingTeacher.teachers.slice(index + 1),
      ],
    };
    return this.settingApi.teacher
      .post(newSettingTeacherState)
      .pipe(tap(() => (this.settingTeachers = newSettingTeacherState)));
  }
}
