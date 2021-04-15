import { Component, OnInit } from '@angular/core';
import { UploaderStatus } from 'types/enums';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  UploaderStatus = UploaderStatus;
  status: UploaderStatus = UploaderStatus.NotSelected;
  constructor() { }

  ngOnInit(): void {
  }

  onFileChanged(event) {

  }
}
