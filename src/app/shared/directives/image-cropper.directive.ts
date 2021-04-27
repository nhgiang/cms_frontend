import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ImageCropperModalComponent } from '@shared/components/image-cropper-modal/image-cropper-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { FileModel } from 'types/typemodel';

@Directive({
  selector: '[imageCropper]',
  exportAs: 'imageCropper'
})
export class ImageCropperDirective {
  @Input() aspectRatio: number;
  @Input() maintainAspectRatio = false;
  @Input() maxSize = 5000000; // 5MB
  @Input() set fileInputEvent($event: { target: HTMLInputElement }) {
    this.set($event);
  }
  @Output() cropped = new EventEmitter<FileModel>();

  private modalRef: NzModalRef;

  constructor(
    private modalService: NzModalService,
    private alert: NzMessageService
  ) { }

  set($event: { target: HTMLInputElement }) {
    if (!$event) {
      return;
    }

    const input = $event.target;
    // console.log(input.files[0]);
    if (!input.files[0].type.startsWith('image/')) {
      this.alert.error('Đây không phải là một file ảnh');
      return;
    }
    if (input.files[0].size > this.maxSize) {
      this.alert.error('Kích thước file ảnh phải nhỏ hơn 5MB');
      return;
    }
    const imageFile = input.files[0];
    input.value = '';
    this.show(imageFile);
  }

  show(image: File | string) {
    let imageFile: File = null;
    let imageUrl = '';
    if (image instanceof File) {
      imageFile = image;
    } else {
      imageUrl = image;
    }
    this.modalRef = this.modalService.create({
      nzContent: ImageCropperModalComponent,
      nzComponentParams: {
        imageFile,
        imageUrl,
        aspectRatio: this.aspectRatio,
        maintainAspectRatio: this.maintainAspectRatio,
      }
    });
    this.modalRef.getContentComponent().cropped.subscribe((imagea) => {
      this.cropped.emit(imagea);
    });
  }
}
