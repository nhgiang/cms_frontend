import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class LessonApiService extends BaseApi {
  endpoint = 'lessions';
  createLesson(body: {
    courseId: string,
    title: string
  }) {
    return this.httpClient.post<any>(this.createUrl(``), body);
  }

  getLessonByCourse(courseId: string) {
    return this.httpClient.get<any>(this.createUrl(`/find-by-course/${courseId}`));
  }

  deleteLesson(id: string) {
    return this.httpClient.delete<any>(this.createUrl(`/${id}`));
  }

  editLesson(id, body) {
    return this.httpClient.put<any>(this.createUrl(`/${id}`), body);
  }
}
