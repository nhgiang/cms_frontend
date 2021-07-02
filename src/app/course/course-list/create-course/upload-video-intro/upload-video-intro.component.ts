import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import * as getYouTubeId from 'get-youtube-id';
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
  @Input() isDisable: boolean;
  @Input() isHidden: boolean;
  displayPreviewYT = false;
  linkYoutubeInput: string;
  fileVideo: File | null;
  @Input() url1: string;
  VideoType = VideoType;
  constructor() {
    super();
  }

  writeValue(obj: any) {
    if (obj) {
      if (this.isUploadLink === VideoType.Youtube) {
        this.linkYoutubeInput = obj;
        this.changeLink(obj);
      } else {
        this.fileVideo = obj;
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

  uploadVideo(e: File) {
    this.fileVideo = e;
    this.onChangeFn(this.fileVideo);
  }

  validate() {
    if (this.isUploadLink === VideoType.Youtube && !getYouTubeId.default(this.linkYoutubeInput)) {
      return { required: true };
    }
    if (this.isUploadLink === VideoType.Vimeo && !this.fileVideo) {
      return { required: true };
    }
    return null;
  }
}

