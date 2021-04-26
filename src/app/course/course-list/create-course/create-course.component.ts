import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { iif, interval, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AssetType } from 'types/enums';

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

  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService,
    private courseTypesApiService: CourseTypesApiService,
    private courseApiService: CourseApiService,
    private storageApiService: StorageApiService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.form = fb.group({
      photo: [null, Validators.required],
      videoIntro: [null],
      name: [null, TValidators.required],
      userId: [null, TValidators.required],
      typeId: [null, TValidators.required],
      description: [null, TValidators.required],
      studentPrice: [null, Validators.required],
      partnerPrice: [null, Validators.required],
      skills: [[]]
    });
  }

  ngOnInit(): void {
    this.previewPhoto();
    this.uploadVideo();
  }

  teachers = (params: any) => {
    return this.teacherApiService.getList(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.fullName }))));
  }

  courseTypes = (params: any) => {
    return this.courseTypesApiService.getList(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.name }))));
  }

  uploadVideo() {
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.storageApiService.uploadFile(this.form.get('photo').value).pipe(
      switchMap(res => {
        this.form.controls.photo.setValue(res);
        if (this.form.get('videoIntro').value instanceof File) {
          return this.storageApiService.uploadVideo(this.form.get('videoIntro').value).pipe(tap((data) => {
            this.form.get('videoIntro').setValue(data);
          }));
        }
        return of();
      }),
      switchMap(() => {
        return this.courseApiService.create(this.form.value);
      })
    ).subscribe(() => {
      this.notification.success('Thành công', '');
      this.router.navigate(['/course-management/course']);
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

