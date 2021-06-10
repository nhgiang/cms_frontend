import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { HelpCenterApiService } from '@shared/api/help-center.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-help-center-edit',
  templateUrl: './help-center-edit.component.html',
  styleUrls: ['./help-center-edit.component.scss']
})
export class HelpCenterEditComponent implements OnInit {

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
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private storageApi: StorageApiService,
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
    Ultilities.validateForm(this.form);
    this.storageApi.uploadFile(this.form.value.coverImage).pipe(switchMap(url => {
      const body = this.form.value;
      body.coverImage = url;
      return this.helpCenterApiService.edit(this.id, this.form.value);
    })).subscribe(res => {
      this.notification.success('Thành công', 'Sửa bài viết thành công');
      this.router.navigate(['/settings-help/help-center/list']);
    }, (err) => {
      this.notification.error('Thất bại', 'Sửa bài viết thất bại');
    });
  }
}
