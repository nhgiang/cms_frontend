import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { Option } from '@shared/interfaces/option.type';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { FileModel } from 'types/typemodel';

@Component({
  selector: 'app-lecturer-create',
  templateUrl: './lecturer-create.component.html',
  styleUrls: ['./lecturer-create.component.scss'],
})
export class LecturerCreateComponent implements OnInit {
  form: FormGroup;
  image: FileModel;
  isPasswordVisible = false;
  avatarUrl: string;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private teacherApi: TeacherApiService,
    private router: Router,
    private specializationApi: SpecializationApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      specializationId: [null],
      password: ['', [TValidators.required, TValidators.passwordRules]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
      royaltyPercentage: [
        null,
        [TValidators.required, TValidators.numberRange(0, 100)],
      ],
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi
      .uploadFile(this.image.file ?? this.avatarUrl, this.image.fileName)
      .pipe(
        switchMap((url) => {
          const { royaltyPercentage, ...rest } = this.form.value;
          const data = {
            avatar: url,
            ...rest,
            data: {
              royaltyPercentage,
              // what if "data" field grows deeply nested?
            },
          };
          return this.teacherApi.create(data);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => {
          this.notification.success('Thành công', 'Tạo mới thông tin giảng viên thành công!');
          this.router.navigate(['/user/lecturer']);
        },
        (err) => {
          if (err.error.statusCode === 409) {
            this.form.get('email').setErrors({ notUnique: true });
          }
        }
      );
  }

  private getBase64(img: Blob | File, callback: (img: {}) => void): void {
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
