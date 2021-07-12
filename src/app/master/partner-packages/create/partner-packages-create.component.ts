import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PartnerPackageApiService } from '@shared/api/partner-packages.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-partner-packages-create',
  templateUrl: 'partner-packages-create.component.html',
})
export class PartnerPackagesCreateComponent implements OnInit {
  constructor(
    private api: PartnerPackageApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  form: FormGroup;
  isloading = false;
  editId: string = null;

  ngOnInit() {
    console.log('check route...', this.route.snapshot);
    this.form = this.fb.group({
      name: ['', [TValidators.required, TValidators.maxLength(20)]],
      maxStorage: ['', TValidators.required],
      monthlyPrice: ['', TValidators.required],
      maxStudents: ['', TValidators.required],
      days: ['', TValidators.required],
    });
  }

  submit() {
    Ultilities.validateForm(this.form);

    //check
    this.isloading = true;
    this.api
      .create(this.form.value)
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe(() => console.log('done'));
  }
}
