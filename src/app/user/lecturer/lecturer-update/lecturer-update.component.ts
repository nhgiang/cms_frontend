import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { FileModel, User } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-lecturer-update',
  templateUrl: './lecturer-update.component.html',
  styleUrls: ['./lecturer-update.component.scss'],
})
export class LecturerUpdateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  teacher: any;
  isPasswordVisible: boolean;
  image: FileModel;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storageApi: StorageApiService,
    private teacherApi: TeacherApiService,
    private router: Router,
    private specializationApi: SpecializationApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.teacher = data.teacher as User;
      this.avatarUrl = this.teacher.avatar;
    });

    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      specializationId: [null],
      password: [null],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
      id: [null],
      royaltyPercentage: [
        null,
        [TValidators.required, TValidators.numberRange(0, 100)],
      ],
    });
    this.form.patchValue(this.teacher);
    this.form.controls.royaltyPercentage.setValue(
      this.teacher.data.royaltyPercentage
      //data schema?
      //potential null, lose execution flow
    );
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;

    this.storageApi
      .uploadFile(this.image?.file ?? this.avatarUrl, this.image?.fileName)
      .pipe(
        switchMap((url) => {
          const { royaltyPercentage, ...rest } = this.form.value;
          const data = {
            avatar: url,
            ...rest,
            data: {
              royaltyPercentage
            },
          };
          return this.teacherApi.update(this.teacher.id, data);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => {
          this.notification.success('Thành công', 'Cập nhật thông tin giảng viên thành công!');
          this.router.navigate(['/user/lecturer']);
        },
        (err) => {
          if (err?.error && err.error.statusCode === 409) {
            this.form.get('email').setErrors({ notUnique: true });
          }
        }
      );
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onCropped(fileModel: FileModel) {
    this.image = fileModel;
    this.getBase64(fileModel.file, (img: string) => {
      this.avatarUrl = img;
    });
  }

  specializations = (params: IPaginate): Observable<Option[]> => {
    return this.specializationApi.getAll(params).pipe(
      map((res) =>
        res.items.map((x) => {
          return { value: x.id, label: x.name };
        })
      )
    );
  }
}
