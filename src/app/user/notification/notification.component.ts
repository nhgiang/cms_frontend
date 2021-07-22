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
    editable: true,
    spellcheck: true,
    height: '15rem',
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
    private router: Router,
    private studentApi: StudentApiService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: [null, [TValidators.required]],
      receivers: [null, [TValidators.required]],
      title: [null, [TValidators.required]]
    });
  }
  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.notificationsService.createNotification(this.form.value).pipe(finalize(() => { this.isLoading = false })).subscribe(x => {
      console.log(x);
    })
  }

  student$ = (params: any) => {
    return this.studentApi.getStudentActive(params).pipe(
      map((data: QueryResult<any>) => {
        data.items.unshift({
          id: null,
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
