import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { SettingFeedback, FileModel } from 'types/typemodel';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {
  form: FormGroup;
  image: FileModel;
  isLoading: boolean;
  @Output() created = new EventEmitter();
  feedbacks: SettingFeedback[];

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
      studentName: [null, [TValidators.textRange(1, 200)]],
      content: [null, [TValidators.textRange(1, 200)]],
      courseName: [null, TValidators.required],
      photo: [null, TValidators.required]
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
      this.form.get('photo').setValue(img);
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.image.file, this.image.fileName).pipe(switchMap(url => {
      this.form.get('photo').setValue(url);
      const data = {
        ...this.form.value
      };
      this.feedbacks.push(trimData(data));
      return this.settingApi.feedbacks.post(this.feedbacks);
    }), finalize(() => {
      this.isLoading = false;
      this.modalRef.close();
    })).subscribe(() => {
      this.notification.success('Thành công', 'Thêm mới đánh giá học viên thành công!');
      this.created.emit();
    });
  }
}
