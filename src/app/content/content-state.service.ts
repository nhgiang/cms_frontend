import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingTeacher } from 'types/typemodel';

@Injectable({
  providedIn: 'root'
})
export class ContentStateService {
  // tslint:disable-next-line: variable-name
  private readonly _teachers = new BehaviorSubject<SettingTeacher>(null);
  readonly teachers: Observable<SettingTeacher> = this._teachers.asObservable();

  constructor() { }

  initState(data) {
    this._teachers.next(data);
  }
}
