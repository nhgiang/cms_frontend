import { Injectable } from '@angular/core';
import { Faq, SettingFeedback, SettingTeacher } from 'types/typemodel';
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
    get: () => this.httpClient.get<SettingFeedback[]>(this.createUrl('-feedbacks')),
    post: (body: SettingFeedback[]) => this.httpClient.post(this.createUrl('-feedbacks/upsert'), body)
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

  stories = {
    get: () => this.httpClient.get<any>(this.createUrl('-stories')),
    post: (body: any) => this.httpClient.post(this.createUrl('-stories'), body)
  };

  hottestCoruse = {
    get: () => this.httpClient.get<any>(this.createUrl('-hottest-courses')),
    post: (body: any) => this.httpClient.post(this.createUrl('-hottest-courses'), body)
  };

  hottestBlog = {
    get: () => this.httpClient.get<any>(this.createUrl('-hottest-blogs')),
    post: (body: any) => this.httpClient.post(this.createUrl('-hottest-blogs'), body)
  };

  chatFacebook = {
    get: () => this.httpClient.get<{ fanpageId: string }>(this.createUrl('-chat-facebooks')),
    post: (body: { fanpageId: string }) => this.httpClient.post(this.createUrl('-chat-facebooks'), body)
  };

  payment = {
    get: () => this.httpClient.get(this.createUrl('-payments'))
  };
}
