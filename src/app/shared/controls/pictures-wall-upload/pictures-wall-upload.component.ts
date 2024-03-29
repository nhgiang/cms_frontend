import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { ImageCropperModalComponent } from '@shared/components/image-cropper-modal/image-cropper-modal.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { switchMap, tap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';
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
  @Input() maxSize = 5_000_000;
  @Input() fileType = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp'];
  @Input() uploadUrl: string;
  @Input() aspectRatio  = 738 / 416;
  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: any[];
  image: FileModel;
  avatarUrl: string;
  url: string;
  private modalRef: NzModalRef;

  constructor(
    private notification: NzNotificationService,
    private storageApiService: StorageApiService,
    private modalService: NzModalService
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
      file.preview = await getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  change(event) {
    if (!['start', 'progress'].includes(event.type)) {
      this.fileList.pop();
      this.fileList.push({ url: this.url });
      this.onChangeFn(this.fileList.map(x => x.url));
    }
  }

  onCropped(fileModel: FileModel) {
    this.image = fileModel;
    this.getBase64(fileModel.file, (img: string) => {
      this.avatarUrl = img;
    });
  }

  private getBase64(img: Blob | File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    if (file.size > this.maxSize) {
      this.notification.error('Thất bại', 'File phải nhỏ hơn 5MB');
      return false;
    }

    if (!this.fileType.includes(file.type)) {
      this.notification.error('Thất bại', 'Không đúng định dạng file');
      return false;
    }
    return true;
  }

  upload = (file: any) => {
    let imageFile: File;
    let imageUrl: string;
    if (file instanceof File) {
      imageFile = file;
    } else {
      imageUrl = file;
    }
    this.modalRef = this.modalService.create({
      nzContent: ImageCropperModalComponent,
      nzComponentParams: {
        imageFile,
        imageUrl,
        aspectRatio: this.aspectRatio,
      }
    });
    return this.modalRef.getContentComponent().cropped.pipe(
      switchMap((image: FileModel) => {
        return this.storageApiService.uploadFile(image.file, image.fileName);
      }),
      tap(path => {
        this.onChangeFn(this.fileList.map(x => x.url));
        this.url = path as string;
      })
    );
  }

  remove = (file: NzUploadFile) => {
    this.fileList = this.fileList.filter(x => x.url !== file.url);
    this.onChangeFn(this.fileList.map(x => x.url));
  }
}

