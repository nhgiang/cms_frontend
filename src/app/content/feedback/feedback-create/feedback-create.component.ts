import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { Feedback } from 'types/typemodel';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  image: Blob;
  isLoading: boolean;
  @Output() created = new EventEmitter();
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
      studentName: [null, TValidators.textRange(1, 200)],
      content: [null, TValidators.textRange(1, 200)],
      courseName: [null, TValidators.required]
    });
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onCropped(image: Blob) {
    this.image = image;
    this.getBase64(image, (img: string) => {
      this.avatarUrl = img;
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.image).pipe(switchMap(url => {
      const data = {
        photo: url,
        ...this.form.value
      };
      this.feedbacks.push(data);
      return this.settingApi.feedbacks.post(this.feedbacks);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Thêm mới đánh giá học viên thành công!');
      this.created.emit();
      this.modalRef.close();
    });
  }
}
