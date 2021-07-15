import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { PartnerPackageApiService } from '@shared/api/partner-packages.api.service';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OTHERID } from 'types/enums';
@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss'],
})
export class Step2Component implements OnInit {
  @Input() form: FormGroup;
  @Input() currentStep: number;
  @Output() currentStepChange = new EventEmitter();
  myForm: FormGroup;
  packageList: any = [];
  otherId = OTHERID;

  constructor(
    private fb: FormBuilder,
    private partnersApiService: PartnersApiService,
    private packageApi: PartnerPackageApiService
  ) {}

  ngOnInit(): void {
    this.packageApi.getList().subscribe((data: any) => {
      this.packageList = data;
    });

    this.myForm = this.fb.group({
      domain: [
        this.form.get('domain').value,
        [TValidators.required, TValidators.maxLength(10)],
        this.validateDomain.bind(this),
      ],
      packageId: [this.form.value.packageId],
      customPackage: this.fb.group({
        maxStorage: [
          this.form.get('customPackage').value?.maxStorage,
          [TValidators.required, TValidators.maxLength(3)],
        ],
        monthlyPrice: [
          this.form.get('customPackage').value?.monthlyPrice,
          [TValidators.required, TValidators.maxLength(9)],
        ],
        maxStudents: [
          this.form.get('customPackage').value?.maxStudents,
          [TValidators.required, TValidators.maxLength(5)],
        ],
        days: [
          this.form.get('customPackage').value?.days,
          [TValidators.required, TValidators.maxLength(5)],
        ],
      }),
    });
  }

  validateDomain(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() => {
        return this.partnersApiService
          .validateDomain(
            `${control.value}${this.partnersApiService.endpointUrl}`
          )
          .pipe(
            map((res) => {
              return res ? { exits: true } : null;
            })
          );
      })
    );
  }

  preStep() {
    this.currentStepChange.emit(this.currentStep - 1);
  }

  change(value) {
    if (value !== this.otherId) {
      this.myForm
        .get('customPackage')
        .patchValue(this.packageList.find((item) => item.id === value));
      this.myForm.get('customPackage').disable();
    } else {
      this.myForm.get('customPackage').enable();
      this.myForm.get('customPackage').patchValue({
        maxStorage: null,
        monthlyPrice: null,
        maxStudents: null,
        days: null,
      });
    }
  }
  submit() {
    Ultilities.validateForm(this.myForm);
    if (this.myForm.value.packageId === this.otherId)
      Ultilities.validateForm(this.myForm.get('customPackage') as FormGroup);
    this.form.patchValue(this.myForm.value);
    this.currentStepChange.emit(1 + this.currentStep);
  }
}
