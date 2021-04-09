import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ImageCropperModalComponent } from '@shared/components/image-cropper-modal/image-cropper-modal.component';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Directive({
  selector: '[imageCropper]',
  exportAs: 'imageCropper'
})
export class ImageCropperDirective {
  @Input() aspectRatio: number;
  @Input() maintainAspectRatio = false;
  @Input() set fileInputEvent($event: { target: HTMLInputElement }) {
    this.set($event);
  }
  @Output() cropped = new EventEmitter<Blob>();

  private modalRef: NzModalRef;

  constructor(
    private modalService: NzModalService,
    private alert: NzNotificationService
  ) { }

  set($event: { target: HTMLInputElement }) {
    if (!$event) {
      return;
    }
    const input = $event.target;
    if (!input.files[0].type.startsWith('image/')) {
      this.alert.error('Thất bại', 'Đây không phải là một file ');
      return;
    }
    const imageFile = input.files[0];
    input.value = '';
    this.show(imageFile);
  }

  show(image: Blob | string) {
    let imageFile: Blob = null;
    let imageUrl = '';
    if (image instanceof Blob) {
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
