import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecializationResolver implements Resolve<Observable<any[]>> {
  constructor(
    private specializationApi: SpecializationApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.specializationApi.getAll({ limit: 50 }).pipe(map(res => {
      return res.items;
    }));
  }
}
