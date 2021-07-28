import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig, AngularEditorService } from '@kolkov/angular-editor';
import { API_BASE_URL } from '@shared/api/base-url';
import { HelpCenterApiService } from '@shared/api/help-center.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { FixFontEditorDirective } from '@shared/services/fix-font-editor-service.ts/fix-font-editor.directive';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-help-center-create',
  templateUrl: './help-center-create.component.html',
  styleUrls: ['./help-center-create.component.scss'],
  providers: [FixFontEditorDirective, AngularEditorService]
})
export class HelpCenterCreateComponent implements OnInit {

  form: FormGroup;
  imageUrl: string;

  constructor(
    private fb: FormBuilder,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService,
    private router: Router,
    private storageApi: StorageApiService,
  ) {
    this.form = this.fb.group({
      title: [null, [TValidators.required, TValidators.maxLength(300)]],
      content: [null, [TValidators.required]],
    });
  }

  ngOnInit() {
  }

  uploaded(url) {
    this.imageUrl = url;
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.storageApi.uploadFile(this.form.value.coverImage).pipe(switchMap(url => {
      const body = this.form.value;
      body.coverImage = url;
      return this.helpCenterApiService.create(this.form.value);
    })).subscribe(() => {
      this.notification.success('Thành công', 'Tạo bài viết thành công');
      this.router.navigate(['/settings-help/help-center/list']);
    });
  }
}
