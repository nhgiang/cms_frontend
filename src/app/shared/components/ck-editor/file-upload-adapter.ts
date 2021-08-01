import { NzMessageService } from 'ng-zorro-antd/message';
import { AssetType } from 'types/enums';
import { bytesToSize } from 'utils/common';

export class MyUploadAdapter {

  xhr: any;
  fileType: AssetType;
  maxSize = 1_300_000;
  currentTypes: string[] = ['jpeg', 'png', 'jpg'];
  constructor(
    private loader: any,
    private uploadUrl: string,
    private messageService: NzMessageService,
  ) { }



  // Starts the upload process.

  upload() {

    return this.loader.file

      .then(file => new Promise((resolve, reject) => {

        this._initRequest();

        this._initListeners(resolve, reject, file);

        this._sendRequest(file);

      }));

  }



  // Aborts the upload process.

  abort() {

    if (this.xhr) {

      this.xhr.abort();

    }

  }



  // Initializes the XMLHttpRequest object using the URL passed to the constructor.

  _initRequest() {

    const xhr = this.xhr = new XMLHttpRequest();



    // Note that your request may look different. It is up to you and your editor

    // integration to choose the right communication channel. This example uses

    // a POST request with JSON as a data structure but your configuration

    // could be different.

    // Replace below url with your API url

    xhr.open('POST', this.uploadUrl, true);

    xhr.responseType = 'json';

  }



  // Initializes XMLHttpRequest listeners.

  _initListeners(resolve, reject, file) {

    const xhr = this.xhr;

    const loader = this.loader;

    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    if (file.type.split('/')[0] !== 'image') {
      this.messageService.error(`Vui lòng chọn đúng định dạng file`);
      reject();
    }

    if (!this.validateSize(file)) {
      this.messageService.error(`Kích cỡ file không được vượt quá ${bytesToSize(this.maxSize)}`);
      reject();
    }

    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.setRequestHeader('X-CSRF-TOKEN', 'CSRF-Token');

    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);

    xhr.addEventListener('error', () => reject(genericErrorText));

    xhr.addEventListener('abort', () => reject());

    xhr.addEventListener('load', () => {

      const response = xhr.response;



      // This example assumes the XHR server's "response" object will come with

      // an "error" which has its own "message" that can be passed to reject()

      // in the upload promise.

      //

      // Your integration may handle upload errors in a different way so make sure

      // it is done properly. The reject() function must be called when the upload fails.

      if (!response || response.error) {

        return reject(response && response.error ? response.error.message : genericErrorText);

      }



      // If the upload is successful, resolve the upload promise with an object containing

      // at least the "default" URL, pointing to the image on the server.

      // This URL will be used to display the image in the content. Learn more in the

      // UploadAdapter#upload documentation.

      resolve({

        default: response.path

      });

    });



    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded

    // properties which are used e.g. to display the upload progress bar in the editor

    // user interface.

    if (xhr.upload) {

      xhr.upload.addEventListener('progress', evt => {

        if (evt.lengthComputable) {

          loader.uploadTotal = evt.total;

          loader.uploaded = evt.loaded;

        }

      });

    }

  }



  // Prepares the data and sends the request.

  _sendRequest(file) {

    // Prepare the form data.

    const data = new FormData();



    data.append('file', file);



    // Important note: This is the right place to implement security mechanisms

    // like authentication and CSRF protection. For instance, you can use

    // XMLHttpRequest.setRequestHeader() to set the request headers containing

    // the CSRF token generated earlier by your application.



    // Send the request.

    this.xhr.send(data);

  }

  private validateSize(file: File) {
    return +file.size < +this.maxSize;
  }
}
