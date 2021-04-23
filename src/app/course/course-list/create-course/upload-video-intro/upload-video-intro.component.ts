import { Component, forwardRef, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
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
    }
  ]
})
export class UploadVideoIntroComponent extends AbstractControlDirective implements OnInit, OnChanges {

  @Input() isUploadLink: boolean;
  displayPreview = false;
  displayPreviewYT = false;
  url: string | ArrayBuffer;
  linkYoutubeInput: string;
  fileVideo: File | null;
  ngControl: NgControl;

  constructor(
    private sanitizer: DomSanitizer,
    private notification: NzNotificationService,
    private injector: Injector
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.isUploadLink) {
    //   this.displayPreview = false;
    // }
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  changeLink(link: string) {
    const id = getYouTubeId.default(link);
    this.displayPreviewYT = !!id;
    this.ngControl.control.setErrors(id ? null : { linkErr: true });
    this.onChangeFn(link);
  }

  linkYoutube() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${getYouTubeId.default(this.linkYoutubeInput)}`);
  }

  uploadVideo(file: File) {
    this.fileVideo = file;
    if (file.type.split('/')[0] !== 'video') {
      return this.notification.error('Thất bại', 'Vui lòng chọn đúng định dạng file');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.url = event.target.result;
      this.displayPreview = true;
    };
    this.onChangeFn(this.fileVideo);
  }

  removeVideo() {
    this.url = null;
  }
}

