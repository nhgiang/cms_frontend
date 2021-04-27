import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  @Input() feedback: any;
  @Output() created = new EventEmitter();
  form: FormGroup;
  image: FileModel;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private storageApi: StorageApiService,
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.feedback) {
      this.form.patchValue(this.feedback)
    }
  }

  buildForm() {
    this.form = this.fb.group({
      studentName: [null, [TValidators.textRange(1, 200)]],
      content: [null, [TValidators.textRange(1, 200)]],
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
      return this.settingApi.feedbacks.post(data);
    }), finalize(() => {
      this.isLoading = false;
      this.modalRef.close();
    })).subscribe(() => this.created.emit());
  }
}
