import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { FeedbackApiService } from '@shared/api/feedback.api.service';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { FeedbackFormComponent } from '@shared/components/feedback-form/feedback-form.component';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { iif, of } from 'rxjs';
import { map, tap, switchMap, finalize } from 'rxjs/operators';
import { AssetType, VideoType } from 'types/enums';
import { Course, Feedback } from 'types/models/course';
import { VideoAsset } from 'types/typemodel';
import { omit } from 'lodash-es';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  assetType = AssetType;
  form: FormGroup;
  photoUrl: string;
  videoUpload: any;
  isUploadLink = true;
  course: Course;
  isLoading = false;
  feedbacks: Feedback[];
  VideoType = VideoType;
  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService,
    private courseTypesApiService: CourseTypesApiService,
    private modalService: NzModalService,
    private courseApiService: CourseApiService,
    private skillsApiService: SkillsApiService,
    private storageApiService: StorageApiService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private feedbackApi: FeedbackApiService
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
      skills: [[], [Validators.required]],
      videoIntroType: [VideoType.Youtube, Validators.required]
    });
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseApiService.getById(courseId).pipe(switchMap(course => {
      this.course = course;
      this.form.get('videoIntroType').patchValue(course.videoIntroType);
      setTimeout(() => {
        this.form.patchValue(omit(course, ['videoIntroType']));
      });
      return this.feedbackApi.getByCourse(course.id);
    })).subscribe(res => {
      this.feedbacks = res;
    });
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
    iif(() => (this.form.value.photo instanceof Blob),
      this.storageApiService.uploadFile(this.form.get('photo').value).pipe(tap(res => this.form.controls.photo.setValue(res))),
      of(true)
    ).pipe(
      switchMap(() => {
        if (this.form.get('videoIntro').value instanceof File) {
          return this.storageApiService.uploadVideo(this.form.get('videoIntro').value).pipe(tap(data => {
            this.form.get('videoIntro').patchValue((data as VideoAsset).path)
          }));
        }
        return of(true);
      }),
      switchMap(() => {
        return this.courseApiService.update(this.course.id, trimData(this.form.value));
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      this.notification.success('Thành công', '');
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
    const modalRef = this.modalService.create({
      nzContent: FeedbackFormComponent,
      nzComponentParams: {
        courseId: this.course.id
      }
    });
    modalRef.componentInstance.refresh.pipe(switchMap(() => {
      return this.feedbackApi.getByCourse(this.course.id);
    })).subscribe(res => {
      this.feedbacks = res;
    });
  }

  editFeedback(id) {
    const modalRef = this.modalService.create({
      nzContent: FeedbackFormComponent,
      nzComponentParams: {
        feedbackId: id
      }
    });
    modalRef.componentInstance.refresh.pipe(switchMap(() => {
      return this.feedbackApi.getByCourse(this.course.id);
    })).subscribe(res => {
      this.feedbacks = res;
    });
  }

  deleteFeedback(id) {
    console.log(id);
    this.feedbackApi.delete(id).pipe(switchMap(() => {
      return this.feedbackApi.getByCourse(this.course.id);
    })).subscribe(res => {
      this.feedbacks = res;
      this.notification.success('Thành công', 'Xóa thông tin đánh giá của học viên thành công!')
    });
  }

  publish() {
    this.courseApiService.publish(this.course.id).subscribe(() => {
      this.notification.success('Thành công', 'Công khai khóa học thành công!')
    });
  }
}
