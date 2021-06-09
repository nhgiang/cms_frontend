import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HelpCenterApiService } from '@shared/api/help-center.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-help-center-create',
  templateUrl: './help-center-create.component.html',
  styleUrls: ['./help-center-create.component.scss']
})
export class HelpCenterCreateComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '30rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'fontName',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'subscript',
        'superscript',
        'indent',
        'outdent',
      ],
      [
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ],
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
    ]
  };
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [null, [TValidators.required, TValidators.maxLength(300)]],
      content: [null, [TValidators.required]],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.helpCenterApiService.create(this.form.value).subscribe(res => {
      this.notification.success('Thành công', 'Tạo bài viết thành công');
      this.router.navigate(['/settings-help/help-center/list']);
    }, (err) => {
      this.notification.error('Thất bại', 'Tạo bài viết thất bại');
    })
  }
}
