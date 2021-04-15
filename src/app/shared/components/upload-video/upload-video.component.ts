import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploaderStatus } from 'types/enums';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  @Input() acceptType: string;
  UploaderStatus = UploaderStatus;
  status: UploaderStatus = UploaderStatus.NotSelected;
  selectedFile: File;

  constructor(private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  onFileChanged($event) {
    const file = ($event.target as HTMLInputElement).files[0];
    if (file.type !== this.acceptType) {
      this.messageService.error(`Chỉ cho phép video định dạng ${this.acceptType}`)
    }
  }
}
