import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SettingApiService } from '@shared/api/setting.api.service';
import { DestroyService } from '@shared/services/destroy.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  providers: [DestroyService]

})
export class StoryComponent implements OnInit {

  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private settingApi: SettingApiService,
    private destroy: DestroyService
  ) {
    this.form = fb.group({
      images: [null],
      content: [null]
    });
  }

  ngOnInit() {
    this.settingApi.stories.get().subscribe(res => this.form.patchValue(res));
    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this.settingApi.stories.post(this.form.value)),
      takeUntil(this.destroy)
    ).subscribe();
  }

}
