import { Component, forwardRef, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TokenService } from '@shared/services/token.service';
import * as editor from './ckeditor';
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
    }
  ]
})
export class CkEditorComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  control: any;
  onChangeFn: (val: any) => void;
  onTouchedFn: (val: any) => void;
  fileList: any[];
  token = localStorage.getItem('token');
  editor = editor;
  config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'highlight',
        'todoList',
        'alignment',
        'findAndReplace',
        'specialCharacters',
        'removeFormat',
        'uploadImage',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'pageBreak',
        'fullScreen',
        'undo',
        'redo',
      ],
    },
    alignment: {
      options: ['left', 'right', 'center', 'justify'],
    },
    image: {
      toolbar: [
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          value: null,
          label: 'Original'
        },
        {
          name: 'resizeImage:40',
          value: '40',
          label: '40%'
        },
        {
          name: 'resizeImage:60',
          value: '60',
          label: '60%'
        }
      ]
    },
    placeholder: this.placeholder
  };

  constructor(
    @Inject(API_BASE_URL) protected hostUrl: string,
    private tokenService: TokenService
  ) {
    this.tokenService.tokenObs.subscribe(token => { this.token = token; });
  }

  onReady($event) {
    const uploadUrl = `${this.hostUrl}/files/upload`;
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'X-CSRF-TOKEN': 'CSRF-Token',
      Authorization: `Bearer ${this.token}`
    }

    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {

      return new MyUploadAdapter(loader, uploadUrl, headers);

    };

  }

  writeValue(obj: any): void {
    this.control = obj;
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
