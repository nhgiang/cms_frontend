import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { Faq, QuestionAnswer } from 'types/typemodel';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends SettingContainer<QuestionAnswer> implements OnInit {
  form: FormGroup;
  faqIndexs = [];
  submiting: boolean;
  assetType = AssetType;

  get itemsControlArray() {
    return this.form.get('items') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<QuestionAnswer>,
    settingVisibleApi: SettingVisibleApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) {
    super(settingVisibleApi, settingApi, SettingKey.QuestionAnswer, SettingKeyEndPoint.QuestionAnswer)
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.faqIndexs = Array(3).fill(0).map(() => ({ isEdit: false }));
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.submiting = true;
    this.storageApi.uploadFile(this.form.value.image).pipe(
      switchMap(url => {
        return this.post({ ...this.form.value, image: url })
      }),
      finalize(() => this.submiting = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật câu hỏi thường gặp thành công');
    });
  }

  protected handleResult(result: { res: QuestionAnswer; isVisible: boolean; }) {
    this.form.patchValue(result.res);
    this.isVisible = result.isVisible
  }

  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }

  protected buildForm() {
    this.form = this.fb.group({
      coverAvatar: [null],
      items: this.fb.array([1, 2, 3].map(() => this.fb.group({
        question: [null, TValidators.textRange(10, 200)],
        answer: [null, TValidators.textRange(10, 600)],
      })))
    });
  }
}
