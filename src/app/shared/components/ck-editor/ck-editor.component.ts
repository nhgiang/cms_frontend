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
        'uploadImage',
        'highlight',
        'alignment',
        'removeFormat',
        'findAndReplace',
        'specialCharacters',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'pageBreak',
        'fullScreen',
        'undo',
        'redo',
      ],
    },
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:alignLeft',
        'imageStyle:alignRight',
        '|',
        'imageTextAlternative',
        '|',
        'imageStyle:block',
        'imageStyle:side',
      ],
      styles: {
        options: ['inline', 'alignLeft', 'alignRight',
          'alignCenter', 'alignBlockLeft', 'alignBlockRight',
          'block', 'side'],
      },
      resizeOptions: [
        {
          name: 'imageStyle:inline',
          value: 'inline',
          label: 'inline'
        },
        {
          name: 'imageStyle:alignLeft',
          value: 'alignLeft',
          label: 'alignLeft'
        },
        {
          name: 'imageStyle:alignRight',
          value: 'alignRight',
          label: 'alignRight'
        },
        {
          name: 'imageStyle:block',
          value: 'block',
          label: 'block'
        },
        {
          name: 'imageStyle:side',
          value: 'side',
          label: 'side'
        },
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    alignment: {
      options: ['left', 'right', 'center', 'justify'],
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
