import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { FeedbackFormComponent } from '@shared/components/feedback-form/feedback-form.component';
import { TValidators } from '@shared/extentions/validators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
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
  steps: Step[];
  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService,
    private courseTypesApiService: CourseTypesApiService,
    private modalService: NzModalService
  ) {
    this.form = fb.group({
      photo: [null, Validators.required],
      videoIntro: [null],
      name: [null, TValidators.required],
      userId: [null, TValidators.required],
      typeId: [null, TValidators.required],
      description: [null, TValidators.required],
      studentPrice: [null, TValidators.required],
      partnerPrice: [null, TValidators.required],
      skills: [null, TValidators.required]
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
    this.steps.push();
  }
}
