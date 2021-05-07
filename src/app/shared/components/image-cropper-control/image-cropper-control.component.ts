import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { v4 } from 'uuid';
import { ImageCropperModalComponent } from '../image-cropper-modal/image-cropper-modal.component';
import { isFunction } from 'lodash-es';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-cropper-control',
  templateUrl: './image-cropper-control.component.html',
  styleUrls: ['./image-cropper-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageCropperControlComponent),
      multi: true
    }
  ]
})
export class ImageCropperControlComponent extends AbstractControlDirective implements OnInit {
  @ViewChild('attachment', { static: false }) attachment: ElementRef;
  @Input() maxSize = 5_000_000;
  @Input() aspectRatio = 1;
  inputId: string;
  imageUrl: string;

  constructor(
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) {
    super();
  }

  writeValue(obj: string) {
    if (obj) {
      this.imageUrl = obj;
    }
  }

  ngOnInit(): void {
    this.inputId = `image-cropper-upload-${v4()}`;
  }

  onFileChanged(e: InputEvent) {
    const file = (e.target as HTMLInputElement).files[0];
    this.attachment.nativeElement.value = '';
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image')) {
      this.messageService.error('Không đúng định dạng ảnh');
      return;
    }
    if (file.size > this.maxSize) {
      this.messageService.error('Vui lòng chọn đúng kích cỡ file');
      return;
    }
    const modalRef = this.modalService.create({
      nzContent: ImageCropperModalComponent,
      nzComponentParams: {
        imageFile: file,
        aspectRatio: this.aspectRatio,
      }
    });
    modalRef.componentInstance.cropped.subscribe(imageCropped => {
      const reader = new FileReader();
      reader.readAsDataURL(imageCropped.file);
      reader.onload = (event) => {
        this.imageUrl = event.target.result as string;
        if (isFunction(this.onChangeFn)) {
          this.onChangeFn(imageCropped.file);
        }
      };
    });
  }
}
