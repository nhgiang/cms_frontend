import { Component, OnInit } from '@angular/core';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Feedback, SettingFeedback } from 'types/typemodel';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackUpdateComponent } from './feedback-update/feedback-update.component';
import { cloneDeep } from 'lodash-es';
import { SettingKey, SettingKeyEndPoint } from 'types/enums';
import { SettingContainer } from '@shared/class/setting-container';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends SettingContainer<Feedback[]> {
  feedbacks: SettingFeedback[];

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,

    settingApi: SettingApiService<Feedback[]>,
    settingVisibleApi: SettingVisibleApiService,
  ) {
    super(settingVisibleApi, settingApi, SettingKey.Feedback, SettingKeyEndPoint.Feedback);
  }

  protected handleResult(result: { res: Feedback[]; isVisible: boolean; }) {
    this.feedbacks = result.res;
    this.isVisible = result.isVisible;
  }

  protected buildForm(): void {
  }

  protected handleResulVisible() {
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
    this.post(this.feedbacks).subscribe(() => {
      this.notification.success('Thành công', 'Xóa thông tin đánh giá học viên thành công!');
    });
  }
}
