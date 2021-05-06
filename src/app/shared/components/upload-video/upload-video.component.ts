import { AfterViewInit, Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import { isFunction } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AssetType, UploaderStatus } from 'types/enums';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadVideoComponent),
      multi: true
    }
  ]
})
export class UploadVideoComponent extends AbstractControlDirective implements OnInit, AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef;
  UploaderStatus = UploaderStatus;
  AssetType = AssetType;
  status: UploaderStatus = UploaderStatus.NotSelected;
  selectedFile: File;
  url: any;
  process = 0;
  file: File;
  maxSize = 100_000_000;

  get content() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(private messageService: NzMessageService, private sanitizer: DomSanitizer) {
    super();
  }
  ngAfterViewInit(): void {
  }

  writeValue(file: any) {
    if (file) {
      this.status = UploaderStatus.Selected;
    }
    this.url = file;
  }

  ngOnInit(): void {
  }

  onFileChanged($event) {
    this.file = ($event.target as HTMLInputElement).files[0];
    if (!this.file) {
      return;
    }
    if (this.file.type !== 'video/mp4') {
      this.messageService.error(`Chỉ cho phép video định dạng mp4`);
      return;
    }

    if (this.file.size > this.maxSize) {
      this.messageService.error(`Chỉ cho phép video có kích thước  nhỏ hơn 100MB`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onprogress = (event) => {
      this.status = UploaderStatus.InProgress;
      this.process = Math.round(event.loaded / event.total * 100);
    };
    reader.onload = (event) => {
      this.url = event.target.result;
      this.status = UploaderStatus.Selected;
    };
    if (isFunction(this.onChangeFn)) {
      this.onChangeFn(this.file);
    }
    this.video.nativeElement.value = '';
  }

  removeVideo() {
    this.url = null;
    this.status = UploaderStatus.NotSelected;
    this.file = undefined;
    this.onChangeFn(this.file);
  }
}
