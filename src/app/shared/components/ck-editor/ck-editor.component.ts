import { Component, forwardRef, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { DestroyService } from '@shared/services/destroy.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import editor from './ckeditor';
import { MyUploadAdapter } from './file-upload-adapter';

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkEditorComponent),
      multi: true
    },
    DestroyService
  ]
})
export class CkEditorComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  onChangeFn: (val: any) => void;
  onTouchedFn: (val: any) => void;
  data = '';
  editor = editor;
  config = {
    placeholder: this.placeholder,
    listStyle: [
      { type: 'disc' }
    ],
  };

  constructor(
    @Inject(API_BASE_URL) protected hostUrl: string,
    private messageService: NzMessageService,
  ) {
  }

  change(e: string) {
    this.onChangeFn(e);
  }

  onReady($event) {
    const uploadUrl = `${this.hostUrl}/files/upload`;

    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, uploadUrl, this.messageService);

    };

  }

  writeValue(obj: string | null): void {
    this.data = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
