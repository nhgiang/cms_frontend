import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { SettingKeyEndPoint } from 'types/enums';
import { Story } from 'types/typemodel';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean;
  constructor(
    fb: FormBuilder,
    private settingApi: SettingApiService<Story>,
    private notification: NzNotificationService
  ) {
    this.settingApi.setEnpoint(SettingKeyEndPoint.Story);
    this.form = fb.group({
      images: [null, [TValidators.minLength(3)]],
      content: [null, [TValidators.maxLength(1000)]]
    });
  }

  ngOnInit() {
    this.settingApi.get().subscribe(res => this.form.patchValue(res));
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.settingApi.post(this.form.value).pipe(finalize(() => this.isLoading = false)).subscribe(() => this.notification.success('Thành Công', 'Cập nhật thông tin câu chuyện thành công'));
  }
}
