import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize, switchMap } from 'rxjs/operators';
import { FileModel, User } from 'types/typemodel';

@Component({
  selector: 'app-lecturer-update',
  templateUrl: './lecturer-update.component.html',
  styleUrls: ['./lecturer-update.component.scss']
})
export class LecturerUpdateComponent implements OnInit {
  form: FormGroup;
  avatarUrl: string;
  teacher: User;
  isPasswordVisible: boolean;
  image: FileModel;
  specializations: any[];
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storageApi: StorageApiService,
    private teacherApi: TeacherApiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.teacher = data.teacher as User;
      this.avatarUrl = this.teacher.avatar;
      this.specializations = data.specializations;
    });

    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      specializationId: [null],
      password: [null],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
      id: [null]
    });
    this.form.patchValue(this.teacher);
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;


    this.storageApi.uploadFile(this.image?.file ?? this.avatarUrl, this.image?.fileName).pipe(
      switchMap((url) => {
        const data = {
          avatar: url,
          ...this.form.value
        };

        Object.keys(data).forEach(k => data[k] = data[k] && data[k].trim());
        return this.teacherApi.update(this.teacher.id, data);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.router.navigate(['/user/lecturer']);
    }, err => {
      if (err?.error && err.error.statusCode === 409) {
        this.form.get('email').setErrors({ notUnique: true });
      }
    });
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
}
