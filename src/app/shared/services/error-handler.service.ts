import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { InvalidFormError } from '@shared/extentions/ultilities';
import { NzMessageService } from 'ng-zorro-antd/message';
import { flatten } from 'lodash-es';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  handlers: Array<{ error: string, handleError: (error: any) => void }>;

  constructor(
    private message: NzMessageService,
    private notification: NzNotificationService
  ) {
    this.handlers = [
      { error: 'InvalidFormError', handleError: this.handleInvalidFormError.bind(this) },
      { error: 'Unknown', handleError: this.handleUnknownError.bind(this) },
    ];
  }

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        const errorMessage = error.error.message;
        if (typeof errorMessage === 'object') {
          const messages: string[] = flatten(Object.values(errorMessage));
          messages.forEach(message => {
            this.message.error(message);
          });
        } else {
          this.message.error(errorMessage);
        }
      } else if (error.status === 422) {
        this.notification.error('Thất bại', error.error?.message);
      }
    } else {
      this.handlers.find(x => x.error === error.constructor.name || x.error === 'Unknown').handleError(error);
    }
  }

  private handleInvalidFormError(error: InvalidFormError) {
    // TODO: Need todo something;
  }

  private handleUnknownError(error: Error) {
    console.error(error.message);
  }

}
