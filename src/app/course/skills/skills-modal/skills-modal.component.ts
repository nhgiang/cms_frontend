import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconApiService } from '@shared/api/icon.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { iif, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { finalize, map, switchMap } from 'rxjs/operators';
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
    private storageApiService: StorageApiService,
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
      if (icon) {
        if (typeof icon !== 'string') {
          const reader = new FileReader();
          reader.readAsDataURL(icon);
          reader.onload = (event) => {
            this.iconUrl = event.target.result as string;
          };
        } else {
          this.iconUrl = icon;
        }
        return;
      }
      this.iconUrl = null;
    });
  }

  icons = (params: any) => {
    return this.iconApiService.findAll(params).pipe(map(res => res.items.map(x => ({ value: x.url, label: x.name }))));
  }

  submit() {

    Ultilities.validateForm(this.form);
    this.isLoading = true;
    iif(() => this.form.controls.icon.value instanceof File,
      this.storageApiService.uploadFile(this.form.get('icon').value),
      of(true)
    ).pipe(
      switchMap(data => {
        if (typeof data === 'string') {
          this.form.controls.icon.setValue(data);
        }
        return this.api(trimData(this.form.value));
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(
      () => {
        this.notificationService.success('Thành công', '');
        this.modalRef.close(true);
      }
    );
  }
}
