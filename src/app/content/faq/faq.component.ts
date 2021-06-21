import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  form: FormGroup;
  faqIndexs = [];
  submiting: boolean;
  assetType = AssetType;

  get itemsControlArray() {
    return this.form.get('items') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.faq.get().subscribe(res => {
      this.itemsControlArray.patchValue(res);
    });
    this.faqIndexs = Array(3).fill(0).map(() => ({ isEdit: false }));
  }

  buildForm() {
    this.form = this.fb.group({
      description: [null],
      avatar: [null],
      isShow: [null],
      items: this.fb.array([1, 2, 3].map(() => this.fb.group({
        question: [null, TValidators.textRange(10, 200)],
        answer: [null, TValidators.textRange(10, 600)],
      })))
    });
  }

  submit() {
    // if (!this.faqIndexs[index].isEdit) {
    //   this.faqIndexs[index].isEdit = !this.faqIndexs[index].isEdit;
    //   return;
    // }
    // Ultilities.validateForm(this.itemsControlArray.controls[index] as FormGroup);

    Ultilities.validateForm(this.form);

    this.submiting = true;
    this.storageApi.uploadFile(this.form.value.image).pipe(
      switchMap(url => {
        return this.settingApi.faq.post({ ...this.form.value, image: url })
      }),
      finalize(() => this.submiting = false)
    ).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật câu hỏi thường gặp thành công');
    });
  }
}
