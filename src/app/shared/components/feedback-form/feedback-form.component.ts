import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeedbackApiService } from '@shared/api/feedback.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {
  @Input() feedbackId: string;
  @Input() courseId: string;
  @Output() refresh = new EventEmitter();
  form: FormGroup;
  image: FileModel;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private feedbackApi: FeedbackApiService,
    private storageApi: StorageApiService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.feedbackId) {
      this.feedbackApi.getById(this.feedbackId).subscribe(feedback => {
        this.form.patchValue(feedback);
      });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      studentName: [null, [TValidators.textRange(1, 200)]],
      content: [null, [TValidators.textRange(1, 200)]],
      photo: [null, TValidators.required],
      courseId: [this.courseId]
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
    this.storageApi.uploadFile(this.image?.file ?? this.form.value.photo, this.image?.fileName).pipe(switchMap(url => {
      this.form.get('photo').setValue(url);
      const data = {
        ...this.form.value
      };
      return this.feedbackId ? this.feedbackApi.edit(this.feedbackId, trimData(data)) : this.feedbackApi.create(trimData(data));
    }), finalize(() => {
      this.isLoading = false;
    })).subscribe(() => {
      this.refresh.emit();
      this.modalRef.close();
    });
  }
}
