import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploaderStatus } from 'types/enums';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  @Input() acceptType: string = 'video/mp4';
  UploaderStatus = UploaderStatus;
  status: UploaderStatus = UploaderStatus.NotSelected;
  selectedFile: File;
  url: any;

  constructor(private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  onFileChanged($event) {
    const file = ($event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    if (file.type !== this.acceptType) {
      this.messageService.error(`Chỉ cho phép video định dạng ${this.acceptType}`);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.url = event.target.result;
      this.status = UploaderStatus.Selected;
    };
  }
}
