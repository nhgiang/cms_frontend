import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherRegistrationsApiService } from '@shared/api/teacher-registrations.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-registration-detail',
  templateUrl: './teacher-registration-detail.component.html',
  styleUrls: ['./teacher-registration-detail.component.scss'],
})
export class TeacherRegistrationDetailComponent implements OnInit {
  form: FormGroup;
  teacher: any;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: TeacherRegistrationsApiService,
    private notif: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      fullName: [null, [TValidators.required]],
      email: [null, [TValidators.required, TValidators.emailRules]],
      specialization: [null, [TValidators.required]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      address: [null],
      coverLetter: [null],
      degree: [null],
      id: [null],
      referenceLinks: [null],
    });

    this.apiService.getById(id).subscribe((teacher) => {
      this.teacher = teacher;
      this.form.patchValue(teacher);
    });
  }

  submitForm(): void {
    Ultilities.validateForm(this.form);
    this.isLoading = true;

    this.apiService
      .update(this.teacher.id, this.form.getRawValue())
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.notif.success(
          'Thành công',
          'Cập nhật thông tin giảng viên đăng kí thành công'
        );
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
}
