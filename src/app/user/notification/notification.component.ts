import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { NotificationsService } from '@shared/api/notifications.api.service';
import { StudentApiService } from '@shared/api/student.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize, map } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserApiService } from '@shared/api/user.api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  form: FormGroup;
  imageUrl: string;
  isLoading: boolean;
  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: `${this.hostUrl}/files/upload`
  };
  maxTag = 4;
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private notificationsService: NotificationsService,
    private studentApi: StudentApiService,
    private notification: NzNotificationService,
    private userApiService: UserApiService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: [null, [TValidators.required]],
      receivers: [null, [TValidators.required]],
      content: [null, [TValidators.required]]
    });
  }
  submit() {
    const receivers: [] = this.form.controls.receivers.value || [];
    if (receivers.length === 0) {
      this.form.get('receivers').setValue(null);
    } else {
      if (receivers.some(x => x === 'all')) {
        this.form.get('receivers').setValue([]);
      }
    }
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.notificationsService.createNotification(this.form.value).pipe(finalize(() => { this.isLoading = false })).subscribe(x => {
      if (x.success) {
        this.notification.success('Thành công', 'Gửi thông báo thành công');
        this.form.reset();
      }
    })
  }

  user$ = (params: any) => {
    return this.userApiService.getAllActive(params).pipe(
      map((data: QueryResult<any>) => {
        data.items.unshift({
          id: 'all',
          fullName: 'Tất cả'
        })
        this.maxTag = data.meta.totalItems;
        return data.items.map((item) => ({
          value: item.id,
          label: item.fullName || item.email
        })) as Option[];

      })
    );
  };

}
