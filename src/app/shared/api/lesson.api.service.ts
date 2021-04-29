import { Injectable } from '@angular/core';
import { Lesson } from 'types/models/course';
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
    return this.httpClient.get<Lesson[]>(this.createUrl(`/find-by-course/${courseId}`));
  }

  deleteLesson(id: string) {
    return this.httpClient.delete<Lesson>(this.createUrl(`/${id}`));
  }

  editLesson(id, body) {
    return this.httpClient.put<Lesson>(this.createUrl(`/${id}`), body);
  }
}
