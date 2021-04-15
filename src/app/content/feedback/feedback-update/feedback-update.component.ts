import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { Feedback, FileModel } from 'types/typemodel';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-feedback-update',
  templateUrl: './feedback-update.component.html',
  styleUrls: ['./feedback-update.component.scss']
})
export class FeedbackUpdateComponent implements OnInit {
  @Output() edited = new EventEmitter();
  form: FormGroup;
  image: FileModel;
  isLoading: boolean;
  index: number;
  feedbacks: Feedback[];

  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private storageApi: StorageApiService,
    private notification: NzNotificationService,
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      studentName: [this.feedbacks[this.index]?.studentName, TValidators.textRange(1, 200)],
      content: [this.feedbacks[this.index]?.content, TValidators.textRange(1, 200)],
      courseName: [this.feedbacks[this.index]?.courseName, TValidators.required]
    });
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onCropped(image: FileModel) {
    this.image = image;
    this.getBase64(image.file, (img: string) => {
      this.feedbacks[this.index].photo = img;
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.image?.file ?? this.feedbacks[this.index].photo, this.image?.fileName).pipe(switchMap(url => {
      const data = {
        photo: url,
        ...this.form.value
      };
      this.feedbacks[this.index] = trimData(data);
      return this.settingApi.feedbacks.post(this.feedbacks);
    }), finalize(() => {
      this.isLoading = false;
      this.modalRef.close();
    })).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật đánh giá học viên thành công!');
      this.edited.emit();
    });
  }
}
