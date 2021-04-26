import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { DestroyService } from '@shared/services/destroy.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AbstractControlDirective } from '../abstract-control.directive';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-pictures-wall-upload',
  templateUrl: './pictures-wall-upload.component.html',
  styleUrls: ['./pictures-wall-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PicturesWallUploadComponent),
      multi: true
    },
  ],
})
export class PicturesWallUploadComponent extends AbstractControlDirective {

  @Input() maxLength = 15;
  @Input() maxSize = 50000000;
  @Input() fileType = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'];
  @Input() uploadUrl: string;
  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: NzUploadFile | string[];

  constructor(
    private notification: NzNotificationService,
    private storageApiService: StorageApiService
  ) {
    super();
  }

  writeValue(obj) {
    if (obj) {
      this.fileList = obj.map(x => ({ url: x }));
    }
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line: no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  change(event) {
    if (!['start', 'progress'].includes(event.type)) {
      this.fileList = this.fileList.filter(x => !x?.uid);
      this.onChangeFn(this.fileList.map(x => x.url));
    }
  }

  upload = (file: any) => this.storageApiService.uploadFile(file).pipe(tap(res => {
    return this.fileList.push({ url: res });
  }))

  remove = (file: NzUploadFile) => {
    this.fileList = this.fileList.filter(x => x.url !== file.url);
    this.onChangeFn(this.fileList.map(x => x.url));
  }
}
