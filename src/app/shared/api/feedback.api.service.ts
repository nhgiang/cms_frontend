import { Injectable } from '@angular/core';
import { Feedback } from 'types/models/course';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class FeedbackApiService extends BaseApi {
  endpoint = 'feedbacks';

  create(body: any) {
    return this.httpClient.post<Feedback>(this.createUrl(''), body);
  }

  getByCourse(courseId) {
    return this.httpClient.get<Feedback[]>(this.createUrl(`/find-by-course/${courseId}`));
  }

  edit(feedbackId, body) {
    return this.httpClient.put<Feedback>(this.createUrl(`/${feedbackId}`), body);
  }

  getById(feedbackId) {
    return this.httpClient.get<Feedback>(this.createUrl(`/${feedbackId}`));
  }

  delete(id) {
    return this.httpClient.delete(this.createUrl(`/${id}`));
  }
}
