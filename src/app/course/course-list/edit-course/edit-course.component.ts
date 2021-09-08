import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { CourseApiService } from '@shared/api/course.api.service';
import { FeedbackApiService } from '@shared/api/feedback.api.service';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { FeedbackFormComponent } from '@shared/components/feedback-form/feedback-form.component';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { AuthenticationService } from '@shared/services/authentication.service';
import { omit } from 'lodash-es';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { from, iif, of } from 'rxjs';
import { finalize, map, switchMap, tap, toArray } from 'rxjs/operators';
import { AssetType, VideoType } from 'types/enums';
import { Course, Feedback } from 'types/models/course';
import { User } from 'types/typemodel';
import { trimData } from 'utils/common';
const ROOT_PARTNER_ID = '00000000-0000-0000-0000-000000000000';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
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
  user: User;
  anonymous: any;
  isDisableAll = false;
  isHidden = false;
  textHidden = 'Ẩn khóa học';
  listSkill = [];
  coursesType: any;
  textConfirm =
    'Khóa học này có thể có học viên. Bạn có chắc chắn muốn ẩn khóa học này?';
  isRootPartner: boolean;
  isVisible: boolean;
  switchLoading: boolean;
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
    private feedbackApi: FeedbackApiService,
    private authService: AuthenticationService
  ) {
    this.form = fb.group({
      photo: [null, Validators.required],
      videoIntro: [null],
      name: [null, TValidators.required],
      userId: [null, TValidators.required],
      typeId: [null, TValidators.required],
      description: [null, TValidators.required],
      studentPrice: [null, [Validators.required, Validators.required]],
      partnerPrice: [null, [Validators.required, Validators.required]],
      skills: [[], [Validators.required]],
      videoIntroType: [VideoType.Youtube, Validators.required],
    });
    this.authService.currentUser.subscribe((x) => {
      this.user = x;
    });
  }

  ngOnInit(): void {
    this.isRootPartner = this.authService.partnerId === ROOT_PARTNER_ID;
    this.authService.anonymousPartnerId$.subscribe((res) => {
      this.anonymous = res;
    });
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseApiService
      .getById(courseId)
      .pipe(
        switchMap((course) => {
          this.listSkill = [...course.skills];
          course.skills = course.skills.map((x) => x.id);
          this.isDisableAll = !course?.isOwner;
          if (course?.isHidden) {
            this.form.disable();
          }
          this.isHidden = course?.isHidden;
          this.isVisible = course?.isVisible;
          this.textHidden = course?.isHidden ? 'Hiện khóa học' : 'Ẩn khóa học';
          this.textConfirm = this.isHidden
            ? 'Bạn có muốn hiện khóa học này?'
            : (course?.hasStudent ? 'Khóa học này có học viên.' : '') +
            ' Bạn có chắc chắn muốn ẩn khóa học này?';
          this.course = course;
          this.form.get('videoIntroType').patchValue(course.videoIntroType);
          setTimeout(() => {
            this.form.patchValue(omit(course, ['videoIntroType']));
          });
          return this.feedbackApi.getByCourse(course.id);
        })
      )
      .subscribe((res) => {
        this.feedbacks = res;
      });
    this.previewPhoto();
  }

  teachers = (params: any) => {
    return this.isDisableAll
      ? from([this.course]).pipe(
        map((res) => ({ value: res.userId, label: res.teacherName })),
        toArray()
      )
      : this.teacherApiService
        .getList(params)
        .pipe(
          map((res) =>
            res.items.map((x) => ({ value: x.id, label: x.fullName }))
          )
        );
  };

  courseTypes = (params: any) => {
    return this.isDisableAll
      ? from([this.course]).pipe(
        map((res) => ({ value: res.typeId, label: res.typeName })),
        toArray()
      )
      : this.courseTypesApiService
        .getList(params)
        .pipe(
          map((res) => res.items.map((x) => ({ value: x.id, label: x.name })))
        );
  };

  skills = (params: any) => {
    return this.isDisableAll
      ? from([...this.listSkill]).pipe(
        map((res) => ({ value: res.id, label: res.name })),
        toArray()
      )
      : this.skillsApiService
        .findAll(params)
        .pipe(
          map((res) => res.items.map((x) => ({ value: x.id, label: x.name })))
        );
  };

  submit() {
    Ultilities.validateForm(this.form);

    this.isLoading = true;
    iif(
      () => this.form.value.photo instanceof Blob,
      this.storageApiService
        .uploadFile(this.form.get('photo').value)
        .pipe(tap((res) => this.form.controls.photo.setValue(res))),
      of(true)
    )
      .pipe(
        switchMap(() => {
          if (this.form.get('videoIntro').value instanceof File) {
            return this.storageApiService
              .uploadVideoPublic(this.form.get('videoIntro').value)
              .pipe(
                tap((data) => {
                  this.form.get('videoIntro').patchValue(data);
                })
              );
          }
          return of(true);
        }),
        switchMap(() => {
          return this.courseApiService.update(
            this.course.id,
            trimData(this.form.value)
          );
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        this.notification.success(
          'Thành công',
          'Cập nhật thông tin chi tiết khóa học thành công!'
        );
      });
  }

  previewPhoto() {
    this.form.get('photo').valueChanges.subscribe((photo) => {
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
        courseId: this.course.id,
      },
    });
    modalRef.componentInstance.refresh
      .pipe(
        switchMap(() => {
          return this.feedbackApi.getByCourse(this.course.id);
        })
      )
      .subscribe((res) => {
        this.feedbacks = res;
      });
  }

  editFeedback(id) {
    const modalRef = this.modalService.create({
      nzContent: FeedbackFormComponent,
      nzComponentParams: {
        feedbackId: id,
      },
    });
    modalRef.componentInstance.refresh
      .pipe(
        switchMap(() => {
          return this.feedbackApi.getByCourse(this.course.id);
        })
      )
      .subscribe((res) => {
        this.feedbacks = res;
      });
  }

  deleteFeedback(id) {
    this.feedbackApi
      .delete(id)
      .pipe(
        switchMap(() => {
          return this.feedbackApi.getByCourse(this.course.id);
        })
      )
      .subscribe((res) => {
        this.feedbacks = res;
        this.notification.success(
          'Thành công',
          'Xóa thông tin đánh giá của học viên thành công!'
        );
      });
  }

  publish() {
    this.courseApiService.publish(this.course.id).subscribe(
      () => {
        this.notification.success(
          'Thành công',
          'Công khai khóa học thành công!'
        );
      },
      (err) => {
        this.notification.error(
          'Thất bại',
          'Khóa học phải có bài giảng mới có thể công khai!'
        );
      }
    );
  }

  hiddenCourses() {
    this.courseApiService
      .hidden(this.course.id, { isHidden: !this.isHidden })
      .subscribe(
        (x) => {
          this.isHidden = x.isHidden;
          if (x.isHidden) {
            this.form.disable();
          } else {
            this.form.enable();
          }
          this.textConfirm = this.isHidden
            ? 'Bạn có muốn hiện khóa học này?'
            : (this.course?.hasStudent ? 'Khóa học này có học viên.' : '') +
            ' Bạn có chắc chắn muốn ẩn khóa học này?';
          const message = this.isHidden
            ? 'Ẩn khóa học thành công!'
            : 'Hiện khóa học thành công!';
          this.notification.success('Thành công', message);
          this.textHidden = this.isHidden ? 'Hiện khóa học' : 'Ẩn khóa học';
        },
        () => {
          this.notification.error('Thất bại', 'Thao tác thất bại!');
        }
      );
  }

  visible(status: boolean) {
    this.isVisible = status;
    this.switchLoading = true;
    this.courseApiService
      .updateVisibility(this.route.snapshot.paramMap.get('courseId'), status)
      .pipe(finalize(() => (this.switchLoading = false)))
      .subscribe(
        () =>
          this.notification.success(
            'Thành công',
            `${this.isVisible ? 'Hiện' : 'Ẩn'} khóa học thành công`
          ),
        () => this.notification.error('Thất bại', 'Xin vui lòng thử lại sau')
      );
  }
}
