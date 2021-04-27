import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

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
    private settingApi: SettingApiService,
    private notification: NzNotificationService
  ) {
    this.form = fb.group({
      images: [null],
      content: [null]
    });
  }

  ngOnInit() {
    this.settingApi.stories.get().subscribe(res => this.form.patchValue(res));
  }

  submit() {
    this.isLoading = true;
    this.settingApi.stories.post(this.form.value).pipe(finalize(() => this.isLoading = false)).subscribe(res => this.notification.success('Thành Công', ''));
  }
}
