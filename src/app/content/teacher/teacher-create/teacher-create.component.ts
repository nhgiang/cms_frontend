import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';
import { trimData } from 'utils/common';
import { ContentStateService } from '../../content-state.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss'],
})
export class TeacherCreateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  image: FileModel;

  constructor(
    private fb: FormBuilder,
    private contentState: ContentStateService,
    private storageApi: StorageApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.storageApi
      .uploadFile(this.image?.file, this.image.fileName)
      .pipe(
        switchMap((res) => {
          this.form.get('photo').setValue(res);
          const data = {
            ...this.form.value,
            avatar: res,
          };
          return this.contentState.createTeacher(trimData(data));
        }),
        finalize(() => this.modalRef.close())
      )
      .subscribe(() => {
        this.notification.success(
          'Thành công',
          'Thêm mới giảng viên thành công!'
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
      this.form.get('photo').setValue(img);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.textRange(1, 200)],
      position: [null, TValidators.textRange(1, 200)],
      photo: [null, Validators.required]
    });
  }
}
