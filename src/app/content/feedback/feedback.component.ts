import { Component, OnInit } from '@angular/core';
import { SettingApiService } from '@shared/api/setting.api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Feedback, SettingFeedback } from 'types/typemodel';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackUpdateComponent } from './feedback-update/feedback-update.component';
import { cloneDeep } from 'lodash-es';
import { SettingKeyEndPoint } from 'types/enums';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  isLoading: boolean;
  feedbacks: SettingFeedback[];

  constructor(
    private settingApi: SettingApiService<Feedback[]>,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) { 
    this.settingApi.setEnpoint(SettingKeyEndPoint.Feedback);
  }

  ngOnInit(): void {
    console.log('init')
    this.fetch();
  }

  fetch() {
    this.settingApi.get().subscribe(res => {
      this.feedbacks = res;
    });
  }

  addItem() {
    const ref = this.modalService.create({
      nzContent: FeedbackCreateComponent,
      nzTitle: 'Thêm đánh giá học viên',
      nzComponentParams: {
        feedbacks: cloneDeep(this.feedbacks)
      }
    });
    ref.componentInstance.created.subscribe(res => {
      this.fetch();
    });
  }

  edit(index) {
    const ref = this.modalService.create({
      nzContent: FeedbackUpdateComponent,
      nzTitle: 'Cập nhật đánh giá học viên',
      nzComponentParams: {
        index,
        feedbacks: cloneDeep(this.feedbacks)
      }
    });
    ref.componentInstance.edited.subscribe(res => {
      this.fetch();
    });
  }

  delete(index) {
    this.feedbacks.splice(index, 1);
    this.settingApi.post(this.feedbacks).subscribe(() => {
      this.notification.success('Thành công', 'Xóa đánh giá học viên thành công');
    });
  }
}
