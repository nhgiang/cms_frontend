import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HelpCenterApiService } from '@shared/api/help-center.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-help-center-edit',
  templateUrl: './help-center-edit.component.html',
  styleUrls: ['./help-center-edit.component.scss']
})
export class HelpCenterEditComponent implements OnInit {

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
  id: string;

  constructor(
    private fb: FormBuilder,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: [null, [TValidators.required, TValidators.maxLength(300)]],
      content: [null, [TValidators.required]],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.helpCenterApiService.find(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  ngOnInit() {
  }

  submit() {
    this.helpCenterApiService.edit(this.id, this.form.value).subscribe(res => {
      this.notification.success('Thành công', 'Sửa bài viết thành công');
      this.router.navigate(['/settings-help/help-center/list']);
    }, (err) => {
      this.notification.error('Thất bại', 'Sửa bài viết thất bại');
    })
  }
}
