import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-help-center-edit',
  templateUrl: './help-center-edit.component.html',
  styleUrls: ['./help-center-edit.component.scss'],
  providers: [FixFontEditorDirective, AngularEditorService]
})
export class HelpCenterEditComponent {


  form: FormGroup;
  id: string;
  ready = false;

  constructor(
    private fb: FormBuilder,
    private helpCenterApiService: HelpCenterApiService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(API_BASE_URL) protected hostUrl: string,
    private storageApi: StorageApiService,
  ) {
    // super(hostUrl, angularEditorService, renderer2);
    this.form = this.fb.group({
      title: [null, [TValidators.required, TValidators.maxLength(300)]],
      content: [null, [TValidators.required]],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.helpCenterApiService.find(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  async submit() {
    Ultilities.validateForm(this.form);
    this.storageApi.uploadFile(this.form.value.coverImage).pipe(switchMap(url => {
      const body = this.form.value;
      body.coverImage = url;
      return this.helpCenterApiService.edit(this.id, this.form.value);
    })).subscribe(() => {
      this.router.navigateByUrl('/settings-help/help-center/list');
      this.notification.success('Thành công', 'Sửa bài viết thành công', { nzDuration: 3000 });
    });
  }
}
