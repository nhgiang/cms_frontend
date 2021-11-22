import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin, iif, of } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { AssetType, VideoType } from 'types/enums';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  assetType = AssetType;
  form: FormGroup;
  photoUrl: string;
  videoUpload: any;
  isUploadLink = true;
  isLoading = false;
  VideoType = VideoType;
  formatterVND = Ultilities.formatterVND;
  parserVND = Ultilities.parserVND;
  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService,
    private courseTypesApiService: CourseTypesApiService,
    private courseApiService: CourseApiService,
    private skillsApiService: SkillsApiService,
    private storageApiService: StorageApiService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.form = fb.group({
      photo: [null, TValidators.required],
      videoIntro: [null],
      name: [null, TValidators.required],
      userId: [null, TValidators.required],
      typeId: [null, TValidators.required],
      description: [null, TValidators.required],
      studentPrice: [null, [Validators.required, Validators.min(0)]],
      partnerPrice: [null, [Validators.required, Validators.min(0)]],
      skills: [[], [Validators.required]],
      videoIntroType: [VideoType.Youtube, Validators.required],
      banner: [null, TValidators.required],
      studentPriceOld: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.previewPhoto();
  }

  teachers = (params: any) => {
    return this.teacherApiService.getList(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.fullName }))));
  }

  courseTypes = (params: any) => {
    return this.courseTypesApiService.getList(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.name }))));
  }

  skills = (params: any) => {
    return this.skillsApiService.findAll(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.name }))));
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    forkJoin([
      this.storageApiService.uploadFile(this.form.get('photo').value).pipe(tap(res => this.form.controls.photo.setValue(res))),
      this.storageApiService.uploadFile(this.form.get('banner').value).pipe(tap(res => this.form.controls.banner.setValue(res))),
    ]).pipe(
      switchMap(() => {
        if (this.form.get('videoIntro').value instanceof File) {
          return this.storageApiService.uploadVideoPublic(this.form.get('videoIntro').value).pipe(tap(data => {
            this.form.get('videoIntro').patchValue(data);
          }));
        }
        return of(true);
      }),
      switchMap(() => {
        return this.courseApiService.create(trimData(this.form.value));
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      this.notification.success('Thành công', 'Tạo mới thông tin cơ bản khóa học thành công!');
      this.router.navigate([`/course-management/course/edit/${res.id}`]);
    });
  }

  previewPhoto() {
    this.form.get('photo').valueChanges.subscribe(photo => {
      if (photo) {
        if (typeof photo !== 'string') {
          const reader = new FileReader();
          reader.readAsDataURL(photo);
          reader.onload = (event) => {
            this.photoUrl = event.target.result as string;
          };
        } else {
          this.photoUrl = photo;
        }
        return;
      }
      this.photoUrl = null;
    });
  }
}

