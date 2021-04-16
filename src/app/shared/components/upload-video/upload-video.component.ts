import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import { isFunction } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AssetType, FileUploadErrors, UploaderStatus } from 'types/enums';

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
export class UploadVideoComponent extends AbstractControlDirective implements OnInit {
  UploaderStatus = UploaderStatus;
  AssetType = AssetType;
  status: UploaderStatus = UploaderStatus.NotSelected;
  selectedFile: File;
  url: any;
  process = 0;
  file: File;
  constructor(private messageService: NzMessageService) {
    super();
  }

  writeValue(file: any) {
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
  }

  removeVideo() {
    this.url = null;
    this.status = UploaderStatus.NotSelected;
    this.file = undefined;
    this.onChangeFn(this.file);
  }
}
