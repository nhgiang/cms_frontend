import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { base64ToFile, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss']
})
export class ImageCropperModalComponent implements OnInit{
  @Input() aspectRatio: number;
  @Input() maintainAspectRatio = false;
  @Input() imageFile: Blob;
  @Output() cropped = new EventEmitter<Blob>();
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  @Input() imageUrl: string;

  isLoading: boolean;
  event: ImageCroppedEvent;

  constructor(
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.aspectRatio) {
      this.maintainAspectRatio = true;
    }
  }

  hide() {
    this.modalRef.close();
  }

  submit() {
    if (!this.imageCropper) {
      return;
    }
    const event = this.imageCropper.crop();
    const file = base64ToFile(event.base64);
    this.cropped.emit(file);
    this.modalRef.close();
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    this.isLoading = false;
  }
}
