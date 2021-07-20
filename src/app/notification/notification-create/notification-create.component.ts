import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { NotificationsService } from '@shared/api/notifications.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.scss']
})
export class NotificationCreateComponent implements OnInit {
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
    // uploadUrl: `${this.hostUrl}/files/upload`
  };
  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private notificationsService: NotificationsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      message: [null, [TValidators.required]],
      receivers: [null],
    });
  }
  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.notificationsService.createNotification(this.form.value).pipe(finalize(() => { this.isLoading = false })).subscribe(x => {
      console.log(x);
      this.router.navigate(['../']);
    })
  }
}
