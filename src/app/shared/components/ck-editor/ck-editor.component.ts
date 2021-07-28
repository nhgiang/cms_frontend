import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TokenService } from '@shared/services/token.service';
import { isFunction } from 'lodash-es';
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
export class CkEditorComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = '';
  form: FormGroup;
  onChangeFn: (val: any) => void;
  onTouchedFn: (val: any) => void;
  fileList: any[];
  token = localStorage.getItem('token');
  editor = editor;
  config = {
    placeholder: this.placeholder
  };

  constructor(
    @Inject(API_BASE_URL) protected hostUrl: string,
    private tokenService: TokenService,
    private fb: FormBuilder,
  ) {
    this.tokenService.tokenObs.subscribe(token => { this.token = token; });
    this.form = this.fb.group({
      editor: []
    });
  }

  ngOnInit(): void {
    this.form.get('editor').valueChanges.subscribe(val => {
      if (isFunction(this.onChangeFn)) {
        this.onChangeFn(val);
      }
    });
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
    this.form.get('editor').setValue(obj);
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
