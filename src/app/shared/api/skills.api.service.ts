import { Injectable } from '@angular/core';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { ICourseSkills } from 'types/models/course-skills.model';
import { QueryResult } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SkillsApiService extends BaseApi {

  endpoint = 'skills';

  findAll(params: IPaginate) {
    return this.httpClient.get<QueryResult<ICourseSkills>>(this.createUrl(''), {
      params: this.createParams(params),
    });
  }

  findOne(id: string) {
    return this.httpClient.get<ICourseSkills>(this.createUrl(`/${id}`));
  }

  create(body: ICourseSkills) {
    return this.httpClient.post<ICourseSkills>(this.createUrl(''), body);
  }

  update(body: ICourseSkills) {
    return this.httpClient.put<ICourseSkills>(this.createUrl(''), body);
  }

  delete(id: string) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
