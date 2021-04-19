import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-pictures-wall-upload',
  templateUrl: './pictures-wall-upload.component.html',
  styleUrls: ['./pictures-wall-upload.component.scss']
})
export class PicturesWallUploadComponent implements OnInit {

  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: NzUploadFile[];

  constructor() { }

  ngOnInit() {
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      // tslint:disable-next-line: no-non-null-assertion
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
}
