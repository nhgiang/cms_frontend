import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { switchMap, tap } from 'rxjs/operators';
import { FileModel, SettingTeacher } from 'types/typemodel';
import { ContentStateService } from '../../content-state.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  image: FileModel;

  constructor(
    private fb: FormBuilder,
    private contentState: ContentStateService,
    private storageApi: StorageApiService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.storageApi.uploadFile(this.image?.file, this.image.fileName).pipe(switchMap(res => {
      const data = {
        ...this.form.value,
        avatar: res
      };
      return this.contentState.createTeacher(data);
    })).subscribe(() => {
      this.modalRef.close();
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
      this.avatarUrl = img;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.textRange(1, 200)],
      position: [null, TValidators.textRange(1, 200)]
    });
  }
}
