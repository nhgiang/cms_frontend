import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageApiService } from '@shared/api/storage.api.service';
import { AbstractControlDirective } from '@shared/controls/abstract-control.directive';
import Player from '@vimeo/player';
import { isFunction } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploaderStatus } from 'types/enums';
declare const amp: any;
@Component({
  selector: 'app-upload-vimeo-control',
  templateUrl: './upload-vimeo-control.component.html',
  styleUrls: ['./upload-vimeo-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadVimeoControlComponent),
      multi: true,
    },
  ],
})
export class UploadVimeoControlComponent
  extends AbstractControlDirective
  implements OnInit, AfterViewInit
{
  @ViewChild('vimeo', { static: false }) vimeo: ElementRef;
  @ViewChild('video', { static: false }) video: ElementRef;
  @Input() confirmationText: string;
  @Input() isPrivate = true;
  @Input() isDisable: boolean;
  UploaderStatus = UploaderStatus;
  status: UploaderStatus = UploaderStatus.NotSelected;
  url: any;
  file: File;
  maxSize = 100_000_000;
  player: Player;
  isProcessing: boolean;
  source: any;

  get content() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  constructor(
    private messageService: NzMessageService,
    private sanitizer: DomSanitizer,
    private storageApi: StorageApiService
  ) {
    super();
  }
  ngAfterViewInit(): void {}

  writeValue(file: any) {
    this.url = file;
    // if (file) {
    //   this.status = UploaderStatus.Selected;
    //   this.storageApi
    //     .getVideo(this.url, this.isPrivate)
    //     .subscribe((video: any) => {
    //       this.isProcessing = !video.url;
    //       const player = amp(this.vimeo.nativeElement, {
    //         techOrder: [
    //           'html5FairPlayHLS',
    //           'azureHtml5JS',
    //           'flashSS',
    //           'silverlightSS',
    //           'html5',
    //         ],
    //         autoplay: true,
    //         controls: true,
    //         width: 'auto',
    //         height: 'auto',
    //       });
    //       if (video.url) {
    //         player.src([
    //           {
    //             src: video.url,
    //             type: 'application/vnd.ms-sstr+xml',
    //             protectionInfo: [
    //               {
    //                 type: 'PlayReady',
    //                 authenticationToken: `Bearer ${video.token}`,
    //               },
    //               {
    //                 type: 'Widevine',
    //                 authenticationToken: `Bearer ${video.token}`,
    //               },
    //               {
    //                 type: 'FairPlay',
    //                 certificateUrl: 'assets/fairplay.cer',
    //                 authenticationToken: `Bearer ${video.token}`,
    //               },
    //             ],
    //           },
    //         ]);
    //       }
    //     });
    // }
  }

  ngOnInit(): void {}

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
