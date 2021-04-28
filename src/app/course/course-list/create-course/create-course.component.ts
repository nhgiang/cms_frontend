import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { FeedbackFormComponent } from '@shared/components/feedback-form/feedback-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { iif, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { Step } from 'types/models/course';

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
  steps: Step[] = [];
  id: string;
  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService,
    private courseTypesApiService: CourseTypesApiService,
    private modalService: NzModalService,
    private courseApiService: CourseApiService,
    private skillsApiService: SkillsApiService,
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
      skills: [[], [Validators.required]]
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

  skills = (params: any) => {
    return this.skillsApiService.findAll(params).pipe(map(res => res.items.map(x => ({ value: x.id, label: x.name }))));
  }

  uploadVideo() {
  }

  submit() {
    Ultilities.validateForm(this.form);
    iif(() => (this.form.controls.photo.value instanceof File),
      this.storageApiService.uploadFile(this.form.get('photo').value).pipe(tap(res => this.form.controls.photo.setValue(res))),
      of(true)
    ).pipe(
      switchMap(() => {
        if (this.form.get('videoIntro').value instanceof File) {
          return this.storageApiService.uploadVideo(this.form.get('videoIntro').value).pipe(tap((data) => {
            this.form.get('videoIntro').setValue(data);
          }));
        }
        return of(true);
      }),
      switchMap(() => {
        return (this.id) ? this.courseApiService.update(this.id, this.form.value) : this.courseApiService.create(this.form.value);
      })
    ).subscribe(res => {
      this.notification.success('Thành công', '');
      this.id = res.id;
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

  addFeedback() {
    this.modalService.create({
      nzContent: FeedbackFormComponent
    });
  }

  addStep() {
    const item = {
      name: 'bước 1',
      order: 1,
      id: '1'
    }
    this.steps.push(item as Step);
  }
}

