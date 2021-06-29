import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-partners-create',
  templateUrl: './partners-create.component.html',
  styleUrls: ['./partners-create.component.scss']
})
export class PartnersCreateComponent implements OnInit {
  form: FormGroup;
  currentStep = 0;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private partnersApiService: PartnersApiService,
    private notification: NzNotificationService
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, [TValidators.required]],
      representative: [null, [TValidators.required]],
      address: [null, [TValidators.required]],
      domain: [null, [TValidators.required]],
      phoneNumber: [null, [TValidators.required, TValidators.maxLength(11)]],
      size: [null, [TValidators.required, TValidators.maxLength(6)]],
      email: [null, [TValidators.required]],
      admin: this.fb.group({
        email: [null, [TValidators.required]],
        password: [null, [TValidators.required]]
      }),
      settings: this.fb.group({
        maxCourses: [null, [TValidators.required]],
      })
    });
  }

  nextStep() {
    this.currentStep += 1;
  }



  back() {
    this.router.navigate(['/partners']);
  }

  submit() {
    this.form.get('domain').setValue(this.form.get('domain').value + this.partnersApiService.endpointUrl);
    this.partnersApiService.create(this.form.value).subscribe(res => {
      this.notification.success('Thành công', 'Tạo mới đối tác thành công');
      this.router.navigate(['/master/partners']);
    },
      (err) => {
        this.notification.error('Thất bại', err.message);
        this.form.get('domain').setValue(this.form.get('domain').value.replace(this.partnersApiService.endpointUrl, ''));
      });
  }
}
