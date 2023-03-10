import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconApiService } from '@shared/api/icon.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { ICourseSkills } from 'types/models/course-skills.model';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss']
})
export class SkillsModalComponent implements OnInit {

  type: 'create' | 'edit';
  data: any;
  assetType = AssetType;
  form: FormGroup;
  image: any;
  api: (data: ICourseSkills) => Observable<ICourseSkills>;
  iconUrl: string;
  isLoading: boolean;

  constructor(
    fb: FormBuilder,
    private modalRef: NzModalRef,
    private notificationService: NzNotificationService,
    private iconApiService: IconApiService
  ) {
    this.form = fb.group({
      icon: [null, Validators.required],
      name: [null, [TValidators.required, TValidators.maxLength(200)]],
      description: [null, [TValidators.required, TValidators.maxLength(500)]]
    });
  }

  ngOnInit() {
    if (this.data) { this.form.patchValue(this.data); }
    this.form.get('icon').valueChanges.subscribe(icon => {
      this.iconUrl = icon ? icon : null;
    });
  }

  icons = (params: any) => {
    return this.iconApiService.findAll(params).pipe(map(res => res.items.map(x => ({ value: x.url, label: x.name }))));
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.api(trimData(this.form.value)).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      // tslint:disable-next-line: max-line-length
      this.notificationService.success('Th??nh c??ng', (this.type === 'edit') ? 'C???p nh???t k??? n??ng th??nh c??ng' : 'T???o m???i k??? n??ng th??nh c??ng');
      this.modalRef.close(true);
    }, err => {
      if (err.status === 409) {
        this.form.controls['name'].setErrors({ dbConflict: true });
      }
    });
  }
}
