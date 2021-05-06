import { Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import * as getYouTubeId from 'get-youtube-id';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { VideoType } from 'types/enums';

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
  @Input() isUploadLink: VideoType;
  displayPreview = false;
  displayPreviewYT = false;
  url: string | ArrayBuffer;
  linkYoutubeInput: string;
  fileVideo: File | null;
  ngControl: NgControl;
  @Input() url1: string;
  VideoType = VideoType;
  constructor(
    private sanitizer: DomSanitizer,
    private notification: NzNotificationService,
  ) {
    super();
  }

  writeValue(obj: any) {
    if (obj) {
      if (this.isUploadLink === VideoType.Youtube) {
        this.linkYoutubeInput = obj;
        this.changeLink(obj);
      } else {
        this.url = obj;
        this.displayPreview = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isUploadLink.currentValue === VideoType.Vimeo) {
      this.onChangeFn(this.fileVideo);
    } else {
      this.onChangeFn(this.linkYoutubeInput);
    }
  }

  ngOnInit() {
  }

  changeLink(link: string) {
    const id = getYouTubeId.default(link);
    this.displayPreviewYT = !!id;
    this.url1 = `https://www.youtube.com/embed/${id}`;
    this.onChangeFn(link);
  }

  uploadVideo(file: File) {
    if (file.type.split('/')[0] !== 'video') {
      this.fileVideo = null;
      return this.notification.error('Thất bại', 'Vui lòng chọn đúng định dạng file');
    }
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
    if (this.isUploadLink === VideoType.Youtube && !getYouTubeId.default(this.linkYoutubeInput)) {
      return { required: true };
    }
    if (this.isUploadLink === VideoType.Vimeo && !this.url) {
      return { required: true };
    }
    return null;
  }
}

