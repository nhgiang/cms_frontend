import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageApiService } from '@shared/api/storage.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize, switchMap } from 'rxjs/operators';
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
  specializations: any[];
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private storageApi: StorageApiService,
    private teacherApi: TeacherApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.specializations = data.specializations;
    });
    this.form = this.fb.group({
      email: [null, [TValidators.required, TValidators.emailRules]],
      fullName: [null, [TValidators.required]],
      specializationId: [null],
      password: ['', [TValidators.required, TValidators.passwordRules]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      bio: [null, TValidators.required],
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApi.uploadFile(this.image.file ?? this.avatarUrl, this.image.fileName).pipe(
      switchMap((url) => {
        const data = {
          avatar: url,
          ...this.form.value,
        };
        Object.keys(data).forEach(k => data[k] = data[k].trim());
        return this.teacherApi.create(data);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.router.navigate(['/user/lecturer']);
    }, err => {
      if (err.error.statusCode === 409) {
        this.form.get('email').setErrors({ notUnique: true });
      }
    });
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
}
