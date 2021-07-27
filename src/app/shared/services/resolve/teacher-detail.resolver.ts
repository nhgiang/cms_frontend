import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Injectable({
  providedIn: 'root',
})
export class TeacherDetailResolver implements Resolve<Observable<any>> {
  constructor(private teacherApi: TeacherApiService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    return this.teacherApi.getById(id).pipe(map(res => {
      if (state.url.split('/').includes('teacher-discount-report')) {
        route.routeConfig.data.title = `Báo cáo chi tiết chiết khấu giảng viên ${res.fullName || res.email}`;
      }
      return res;
    }));
  }
}
