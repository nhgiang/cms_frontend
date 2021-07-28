import { Component, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { DestroyService } from '@shared/services/destroy.service';
import { TokenService } from '@shared/services/token.service';
import { isFunction } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter, takeUntil } from 'rxjs/operators';
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
  token = { token: localStorage.getItem('token') };
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
    private tokenService: TokenService,
    private destroy: DestroyService,
    private messageService: NzMessageService
  ) {
    this.tokenService.tokenObs.pipe(filter(x => !!x), takeUntil(this.destroy)).subscribe(token => { this.token.token = token; });
  }

  change(e) {
    this.onChangeFn(e);
  }

  onReady($event) {
    const uploadUrl = `${this.hostUrl}/files/upload`;
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'X-CSRF-TOKEN': 'CSRF-Token',
      Authorization: `Bearer ${this.token.token}`
    };

    $event.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader, uploadUrl, headers, this.messageService);

    };

  }

  writeValue(obj: any): void {
    if (obj) {
      this.data = obj;
    }
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
