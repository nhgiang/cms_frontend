import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageApiService } from '@shared/api/storage.api.service';
import { UnitsApiService } from '@shared/api/units.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';

@Component({
  selector: 'app-lesson-video',
  templateUrl: './lesson-video.component.html',
  styleUrls: ['./lesson-video.component.scss']
})
export class LessonVideoComponent implements OnInit, OnChanges {
  form: FormGroup;
  isLoading: boolean;
  @Input() unit: any;
  lessonId: string;
  AssetType = AssetType;
  courseId: string;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private unitApi: UnitsApiService,
    private router: Router,
    private notification: NzNotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('lessonId');
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.unit.currentValue) {
      this.form.patchValue(this.unit);
    }
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    forkJoin({
      file: this.storageApi.uploadFiles(this.form.value.attachments),
      video: this.storageApi.uploadVideoFile(this.form.value.video)
    }).pipe(switchMap(({ file, video }) => {
      const data = {
        title: this.form.value.title.trim(),
        lessionId: this.lessonId,
        duration: typeof video === 'string' ? this.unit.duration : video.duration,
        video: typeof video === 'string' ? video : 'https://player.vimeo.com/video/' + video.id,
        attachments: file
      };
      return this.unit ? this.unitApi.editUnit(this.route.snapshot.paramMap.get('unitId'), data) : this.unitApi.createUnit(data);
    }), finalize(() => this.isLoading = false)).subscribe(() => {
      this.router.navigate(['/course-management/course/edit', this.courseId]);
      this.notification.success('Thành công', `${this.unit ? 'Cập nhật' : 'Thêm mới'} video bài giảng thành công!`);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      video: [null, Validators.required],
      attachments: [null]
    });
  }
}
