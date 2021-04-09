import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  form: FormGroup;
  faqIndexs = [];
  submiting: boolean;

  get itemsControlArray() {
    return this.form.get('items') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.settingApi.faq.get().subscribe(res => {
      this.itemsControlArray.patchValue(res);
    });
    for (const i of [1, 2, 3]) {
      this.faqIndexs.push({ isEdit: false });
    }
  }

  buildForm() {
    this.form = this.fb.group({
      items: this.fb.array([1, 2, 3].map(() => this.fb.group({
        question: [null, [TValidators.minLength(10), TValidators.maxLength(300)]],
        answer: [null, [TValidators.minLength(10), TValidators.maxLength(600)]],
      })))
    });
  }

  submit(index: number) {
    if (!this.faqIndexs[index].isEdit) {
      this.faqIndexs[index].isEdit = !this.faqIndexs[index].isEdit;
      return;
    }
    this.submiting = true;
    Ultilities.validateForm(this.itemsControlArray.controls[0] as FormGroup);
    this.settingApi.faq.post(this.form.value.items).pipe(finalize(() => this.submiting = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật câu hỏi thường gặp thành công');
      this.faqIndexs[index].isEdit = !this.faqIndexs[index].isEdit;
    });
  }
}