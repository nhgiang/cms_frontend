import { Component, ElementRef, forwardRef, Injector, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import * as getYouTubeId from 'get-youtube-id';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';

@Component({
  selector: 'app-upload-video-intro',
  templateUrl: './upload-video-intro.component.html',
  styleUrls: ['./upload-video-intro.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadVideoIntroComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: UploadVideoIntroComponent,
      multi: true
    }
  ]
})
export class UploadVideoIntroComponent extends AbstractControlDirective implements OnInit, OnChanges {
  @ViewChild('inputUpload', { static: false }) inputUpload: ElementRef;
  @Input() isUploadLink: boolean;
  displayPreview = false;
  displayPreviewYT = false;
  url: string | ArrayBuffer;
  linkYoutubeInput: string;
  fileVideo: File | null;
  ngControl: NgControl;
  @Input() url1: string;
  constructor(
    private sanitizer: DomSanitizer,
    private notification: NzNotificationService,
  ) {
    super();
  }

  writeValue(obj: any) {
    if (obj) {
      this.linkYoutubeInput = obj;
      this.changeLink(obj)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isUploadLink.currentValue) {
      this.onChangeFn(this.linkYoutubeInput);
    } else {
      this.onChangeFn(this.fileVideo);
    }
  }

  ngOnInit() {
  }

  changeLink(link: string) {
    const id = getYouTubeId.default(link);
    this.displayPreviewYT = !!id;
    this.url1 = `https://www.youtube.com/embed/${id}`
    this.onChangeFn(link);
  }

  uploadVideo(file: File) {
    if (file.type.split('/')[0] !== 'video') {
      this.fileVideo = null;
      return this.notification.error('Thất bại', 'Vui lòng chọn đúng định dạng file');
    }
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = event.target.result;
        this.displayPreview = true;
      };
    }
    this.fileVideo = file;
    this.onChangeFn(this.fileVideo);
    this.inputUpload.nativeElement.value = '';
  }

  removeVideo() {
    this.displayPreview = false;
    this.fileVideo = null;
    this.url = null;
    this.onChangeFn(this.fileVideo);
  }

  validate() {
    if (this.isUploadLink && !getYouTubeId.default(this.linkYoutubeInput)) {
      return { required: true };
    }
    if (!this.isUploadLink && !this.fileVideo) {
      return { required: true };
    }
    return null;
  }
}

