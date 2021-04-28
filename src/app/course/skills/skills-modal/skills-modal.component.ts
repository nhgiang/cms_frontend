import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
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
    private storageApiService: StorageApiService
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

  submit() {

    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.storageApiService.uploadFile(trimData(this.form.get('icon').value)).pipe(
      switchMap(data => {
        this.form.controls.icon.setValue(data);
        return this.api(this.form.value);
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
