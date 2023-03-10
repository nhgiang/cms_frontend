import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import { AssetType, FileUploadErrors, UploaderStatus } from 'types/enums';
import { isFunction } from 'lodash-es';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { bytesToSize } from 'utils/common';

@Component({
  selector: 'app-file-upload-control',
  templateUrl: './file-upload-control.component.html',
  styleUrls: ['./file-upload-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadControlComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FileUploadControlComponent,
      multi: true,
    }
  ]
})
export class FileUploadControlComponent extends AbstractControlDirective implements OnInit {
  @ViewChild('attachment', { static: false }) attachment: ElementRef;
  @Input() fileType: AssetType;
  @Input() maxSize = 5_000_000;
  @Input() customLabel = false;
  @Input() inputId: string;
  @Output() uploaded = new EventEmitter();
  AssetType = AssetType;
  url: any;
  file: File;
  status = UploaderStatus.NotSelected;
  currentTypes: any[];

  get content() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private messageService: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void { }

  writeValue(obj: any) {
    this.url = obj;
  }

  onFileChanged($event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.attachment.nativeElement.value = '';
    if (file.type.split('/')[0] !== 'image') {
      this.messageService.error(`Vui lòng chọn đúng định dạng file`);
      return;
    }

    if (!this.validateSize(file)) {
      this.messageService.error(`Kích cỡ file không được vượt quá ${bytesToSize(this.maxSize)}`);
      return;
    }

    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (event) => {
      this.url = event.target.result;
      this.uploaded.emit(this.url);
      if (isFunction(this.onChangeFn)) {
        this.onChangeFn(this.file);
      }
    };
  }

  removeFile() {
    this.url = null;
    this.status = UploaderStatus.NotSelected;
    this.file = undefined;
    this.onChangeFn(this.file);
  }

  initExtentionFile(assetType: AssetType) {
    switch (assetType) {
      case AssetType.Image:
        this.currentTypes = ['image'];
        break;
      case AssetType.undefined:
        this.currentTypes = [];
        break;
      default: return;
    }
  }

  validate() {
    const errors = [];
    let result = null;
    if (!this.file && !this.file?.name) {
      return null;
    }
    if (this.fileType) {
      const isValidType = !this.validateType(this.file?.type);
      if (isValidType) {
        errors.push(FileUploadErrors.Type);
      }
    }
    if (this.maxSize !== 0) {
      const isValidSize = !this.validateSize(this.file);
      if (isValidSize) {
        errors.push(FileUploadErrors.Size);
      }
    }
    errors.forEach(x => {
      switch (x) {
        case FileUploadErrors.Type:
          result = ({ typeValidated: true });
          break;
        case FileUploadErrors.Size:
          result = ({ sizeValidated: true });
          break;
        default:
          result = null;
          break;
      }
    });
    return result;
  }

  private validateType(url: string): boolean {
    if (this.fileType) {
      this.initExtentionFile(this.fileType);
    }
    const types = url.split('/')[0];
    return this.currentTypes.indexOf(types) >= 0;
  }

  private validateSize(file: File) {
    return +file.size < +this.maxSize;
  }
}
