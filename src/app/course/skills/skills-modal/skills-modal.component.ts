import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { ICourseSkills } from 'types/models/course-skills.model';
import { FileModel } from 'types/typemodel';

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

  constructor(
    fb: FormBuilder,
    private modalRef: NzModalRef,
    private notificationService: NzNotificationService
  ) {
    this.form = fb.group({
      icon: [null, TValidators.required],
      name: [null, TValidators.required],
      description: [null, TValidators.required]
    });
  }

  ngOnInit() {
    if (this.data) { this.form.patchValue(this.data); }
  }

  onCropped(image: FileModel) {
    this.image = image;
    this.getBase64(image.file, (img: string) => {
      this.form.get('photo').setValue(img);
    });
  }

  private getBase64(img: Blob, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  submit() {
    if (this.form.invalid) { return; }
    this.api(this.form.value).subscribe(
      () => {
        this.notificationService.success('Thành công', '');
        this.modalRef.close(true);
      }
    );
  }
}
