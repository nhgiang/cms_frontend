import { Injectable } from '@angular/core';
import { Faq, Feedback, SettingTeacher } from 'types/typemodel';
import { BaseApi } from './base-api';

@Injectable({
  providedIn: 'root'
})
export class SettingApiService extends BaseApi {
  endpoint = 'setting';

  premiums = {
    get: () => this.httpClient.get<any>(this.createUrl('-premiums')),
    post: (body) => this.httpClient.post<any>(this.createUrl('-premiums'), body)
  };

  footer = {
    get: () => this.httpClient.get<any>(this.createUrl('-footers')),
    post: (body) => this.httpClient.post<any>(this.createUrl('-footers'), body)
  };

  faq = {
    get: () => this.httpClient.get<any>(this.createUrl('-question-answers')),
    post: (body: Faq[]) => this.httpClient.post<any>(this.createUrl('-question-answers'), body)
  };

  feedbacks = {
    get: () => this.httpClient.get<Feedback[]>(this.createUrl('-feedbacks')),
    post: (body: Feedback[]) => this.httpClient.post(this.createUrl('-feedbacks/upsert'), body)
  };

  teacher = {
    get: () => this.httpClient.get<SettingTeacher>(this.createUrl('-teachers')),
    post: (body) => this.httpClient.post(this.createUrl('-teachers'), body)
  };

  videoIntro = {
    get: () => this.httpClient.get<any>(this.createUrl('-video-intro')),
    post: (body) => this.httpClient.post(this.createUrl('-video-intro'), body)
  };

  aboutUs = {
    get: () => this.httpClient.get<any>(this.createUrl('-about-us')),
    post: (body) => this.httpClient.post(this.createUrl('-about-us'), body)
  };

  videoIntroContact = {
    get: () => this.httpClient.get<any>(this.createUrl('-video-intro-contact')),
    post: (body) => this.httpClient.post(this.createUrl('-video-intro-contact'), body)
  };
}
