import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import Player from '@vimeo/player';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploaderStatus } from 'types/enums';
import { isFunction } from 'lodash-es';

@Component({
  selector: 'app-upload-vimeo-control',
  templateUrl: './upload-vimeo-control.component.html',
  styleUrls: ['./upload-vimeo-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadVimeoControlComponent),
      multi: true
    }
  ]
})
export class UploadVimeoControlComponent extends AbstractControlDirective implements OnInit, AfterViewInit {
  @ViewChild('vimeo', { static: false }) vimeo: ElementRef;
  @ViewChild('video', { static: false }) video: ElementRef;
  @Output() duration = new EventEmitter();
  UploaderStatus = UploaderStatus;
  status: UploaderStatus = UploaderStatus.NotSelected;
  url: any;
  file: File;
  maxSize = 100_000_000;
  player: Player;

  get content() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(
    private messageService: NzMessageService,
    private sanitizer: DomSanitizer) {
    super();
  }
  ngAfterViewInit(): void {

  }

  writeValue(file: any) {
    this.url = file;
    if (file) {
      this.status = UploaderStatus.Selected;
      setTimeout(() => {
        this.player = new Player(this.vimeo.nativeElement, {
          id: this.url.split('/').slice(-1)[0]
        });
      });
    }

  }

  ngOnInit(): void {
  }

  onFileChanged($event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.video.nativeElement.value = '';
    if (!file) {
      return;
    }
    if (file.type !== 'video/mp4') {
      this.messageService.error(`Chỉ cho phép video định dạng mp4`);
      return;
    }
    this.file = file;
    this.status = UploaderStatus.Selected;
    if (isFunction(this.onChangeFn)) {
      this.onChangeFn(file);
    }
  }

  removeVideo() {
    this.url = null;
    this.status = UploaderStatus.NotSelected;
    this.file = null;
    this.onChangeFn(null);
  }
}
