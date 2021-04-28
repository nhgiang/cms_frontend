import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageApiService } from '@shared/api/storage.api.service';
import { UnitsApiService } from '@shared/api/units.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VideoAsset } from 'types/typemodel';

@Component({
  selector: 'app-lesson-video',
  templateUrl: './lesson-video.component.html',
  styleUrls: ['./lesson-video.component.scss']
})
export class LessonVideoComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;
  @Input() unit: any;
  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private unitApi: UnitsApiService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.unit) {
      this.form.patchValue(this.unit);
    }
  }

  submit() {
    Ultilities.validateForm(this.form);
    forkJoin({
      file: this.storageApi.uploadFile(this.form.value.file),
      video: this.storageApi.uploadVideo(this.form.value.video)
    }).pipe(switchMap(({ file, video }) => {
      const data = {
        title: this.form.value.trim(),
        lessionId: this.unit.lessionId,
        duration: typeof video === 'string' ? this.unit.duration : video.duration,
        video: typeof video === 'string' ? video : video.path,
        attachment: file
      };
      return this.unitApi.createUnit(data);
    })).subscribe(() => {
      this.router.navigate(['/course-management/course/create']);
      this.notification.success('Thành công', 'Thêm mới video bài giảng thành công!')
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      video: [null, Validators.required],
      file: [null]
    });
  }
}
