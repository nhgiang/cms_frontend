import { Component, forwardRef, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { API_BASE_URL } from '@shared/api/base-url';
import { DestroyService } from '@shared/services/destroy.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import editor from './ckeditor';
import { MyUploadAdapter } from './file-upload-adapter';

const IFRAME_SRC = '//cdn.iframe.ly/api/iframe';
const API_KEY = 'd7f2c7c9e2def0a48a6372';
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
    image: {
      toolbar: [
        "imageStyle:inline",
        "imageStyle:alignLeft",
        "imageStyle:alignRight",
        "|",
        "imageTextAlternative",
        "|", "imageStyle:block",
        "imageStyle:alignBlockLeft",
        "imageStyle:alignBlockRight",
        "|",
        "resizeImage",
      ],
      resizeOptions: [
        {
          name: 'resizeImage:Original',
          value: null,
          label: 'Original'
        },
        {
          name: 'resizeImage:25',
          value: '25',
          label: '25%'
        },
        {
          name: 'resizeImage:50',
          value: '50',
          label: '50%'
        },
        {
          name: 'resizeImage:75',
          value: '75',
          label: '75%'
        },
        {
          name: 'resizeImage:100',
          value: '100',
          label: '100%'
        }
      ],
    },
    mediaEmbed: {
      // Previews are always enabled if there’s a provider for a URL (below regex catches all URLs)
      // By default `previewsInData` are disabled, but let’s set it to `false` explicitely to be sure

      providers: [
        {
          // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
          name: 'iframely',

          // Match all URLs or just the ones you need:
          url: /.+/,

          html: (match) => {
            const url = match[0];

            const iframeUrl = IFRAME_SRC + '?app=2&api_key=' + API_KEY + '&url=' + encodeURIComponent(url);

            return (
              // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
              '<div class="iframely-embed">' +
              '<div class="iframely-responsive">' +
              `<iframe src="${iframeUrl}" ` +
              'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
              '</iframe>' +
              '</div>' +
              '</div>'
            );
          },
        },
      ],
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    }
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
