import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { AssetType, FileUploadErrors } from 'types/enums';
import { FileUploadControlComponent } from '../file-upload-control/file-upload-control.component';
import { isFunction } from 'lodash-es';
import { v4 } from 'uuid';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-files-upload-control',
  templateUrl: './files-upload-control.component.html',
  styleUrls: ['./files-upload-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesUploadControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FilesUploadControlComponent,
      multi: true,
    }
  ]
})
export class FilesUploadControlComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: false }) input: ElementRef;
  @Input() fileType: AssetType;
  @Input() public maxSize = 0;
  private currentTypes: any[];
  FileUploadErrors = FileUploadErrors;
  files: File[] = [];
  fileNames: string[] = [];
  private onChangeFn: Function;
  inputId: string;

  constructor(
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.inputId = `file-input-${v4()}`;
  }

  onFileChanged(event: any) {

    const input = (event.target as HTMLInputElement);
    if (!input) {
      return;
    }
    const files = [];

    for (let i = 0; i < input.files.length; i++) {
      files.push(input.files[i]);
    }

    this.input.nativeElement.value = '';
    if (files.some(file => file.type !== 'application/pdf')) {
      this.messageService.error('Vui lòng chọn đúng định dạng file');
      return;
    }
    this.files.push(...files);
    this.fileNames = this.files.map(t => t.name);
    if (isFunction(this.onChangeFn)) {
      this.onChangeFn(this.files);
    }
  }

  remove(index?: number) {
    this.files.splice(index, 1);
    this.fileNames = this.files.map(t => t.name);
    if (isFunction(this.onChangeFn)) {
      this.onChangeFn(this.files);
    }
  }

  writeValue(file) {
    if (!file) {
      this.fileNames = [];
      return;
    }
    if (file instanceof Array) {
      this.fileNames = file.map(url => url.match(/[^\/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/)[0]);
    }
  }
  registerOnChange(fn) {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn) {
  }

  private initExtentionFile(assetType: AssetType) {
    switch (assetType) {
      case AssetType.File:
        this.currentTypes = ['pdf'];
        break;
      case AssetType.undefined:
        this.currentTypes = [];
        break;
      default: return;
    }
  }
  validate(): ValidationErrors | null {
    const errors = [];
    let result = null;
    if (!this.fileNames.length) {
      return null;
    }
    if (this.fileType) {
      let fileUrls = [];
      fileUrls = [...this.fileNames];

      fileUrls.forEach((url) => {
        const isValidType = !this.validateType(url);
        if (isValidType) {
          errors.push(FileUploadErrors.Type);
        }
      });
    }
    if (this.maxSize !== 0) {
      let files = [];
      files = [...this.files];
      files.forEach(file => {
        const isValidSize = !this.validateSize(file);
        if (isValidSize) {
          errors.push(FileUploadErrors.Size);
        }
      });
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
    const types = url.split('.');
    const extension = types[types.length - 1];
    return this.currentTypes.indexOf(extension) >= 0;
  }
  private validateSize(file: File) {
    return +file.size < +this.maxSize;
  }
}
