import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Observable } from 'rxjs';
import { User } from 'types/typemodel';

@Injectable({
  providedIn: 'root',
})
export class TeacherDetailResolver implements Resolve<Observable<User>> {
  constructor(private teacherApi: TeacherApiService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    const id = route.paramMap.get('id');
    return this.teacherApi.getById(id);
  }
}
