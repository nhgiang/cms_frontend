import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel, SettingTeacherItem } from 'types/typemodel';
import { trimData } from 'utils/common';
import { ContentStateService } from '../../content-state.service';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.scss'],
})
export class TeacherUpdateComponent implements OnInit {
  index: number;
  teacher: SettingTeacherItem;
  form: FormGroup;
  image: FileModel;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private contentState: ContentStateService,
    private storageApi: StorageApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.contentState.setttingTeacher$.subscribe((data) => {
      this.teacher = data.teachers[this.index];
      this.form.patchValue(this.teacher);
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi
      .uploadFile(
        this.image?.file ?? this.form.value.avatar,
        this.image?.fileName
      )
      .pipe(
        switchMap((res) => {
          const data = {
            ...this.form.value,
            avatar: res,
          };
          return this.contentState.updateTeacher(trimData(data), this.index);
        }),
        finalize(() => {
          this.isLoading = false;
          this.modalRef.close()
        })
      )
      .subscribe(() => {
        this.notification.success(
          'Thành công',
          'Cập nhật thông tin giảng viên thành công!'
        );
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
      this.form.get('avatar').setValue(img);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.textRange(1, 200)],
      position: [null, TValidators.textRange(1, 200)],
      avatar: [null, TValidators.required],
    });
  }
}
