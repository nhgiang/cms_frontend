import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CertificationApiService } from '@shared/api/certification.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { ImageCropperControlComponent } from '@shared/components/image-cropper-control/image-cropper-control.component';
import { TValidators } from '@shared/extentions/validators';
import Mustache from 'mustache';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AssetType } from 'types/enums';
import { v4 } from 'uuid';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  @ViewChild('signature', { static: false }) signature: ImageCropperControlComponent;
  @ViewChild('logo', { static: false }) logo: ImageCropperControlComponent;
  form: FormGroup;
  template: string;
  AssetType = AssetType;
  logoId: string;
  signatureId: string;

  get templatePreview() {
    return this.template && this.sanitizer.bypassSecurityTrustHtml(`${this.template}`);
  }

  constructor(
    private fb: FormBuilder,
    private certificateApi: CertificationApiService,
    private sanitizer: DomSanitizer,
    private storageApi: StorageApiService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.logoId = v4();
    this.signatureId = v4();
    this.builform();
    this.certificateApi.get().subscribe((res: any) => {
      this.template = Mustache.render(res.template,
        {
          ...res,
          companyName: 'CÔNG TY TNHH TƯ VẤN VÀ ĐÀO TẠO BEAUTYUP',
          courseName: 'chăm sóc da cơ bản',
          fullName: 'Lâm tiểu vy'
        });
      this.form.patchValue({ ...res }, { emitEvent: false });
    });
    this.form.valueChanges.subscribe(value => {
      console.log(this.signature)
      setTimeout(() => {
        this.template = Mustache.render(value.template,
          {
            courseName: 'chăm sóc da cơ bản',
            fullName: 'Lâm tiểu vy',
            signature: this.signature.imageUrl,
            logo: this.logo.imageUrl,
            companyName: value.companyName ?? 'CÔNG TY TNHH TƯ VẤN VÀ ĐÀO TẠO BEAUTYUP',
            director: value.director ?? 'Trần Minh Tính',
            address: value.address ?? 'Tp Hồ Chí Minh',
          });
      });
    });

  }

  submit() {
    // tslint:disable-next-line: forin
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    if (this.form.invalid) {
      throw new Error();
    }
    forkJoin({
      logo: this.storageApi.uploadFile(this.form.value.logo),
      signature: this.storageApi.uploadFile(this.form.value.signature)
    }).pipe(switchMap(res => {
      const data = {
        ...this.form.value,
        logo: res.logo,
        signature: res.signature
      };
      return this.certificateApi.update(data);
    })).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin chứng chỉ thành công');
    });
  }

  builform() {
    this.form = this.fb.group({
      logo: [null, Validators.required],
      signature: [null, TValidators.required],
      companyName: [null, TValidators.textRange(1, 100)],
      director: [null, TValidators.textRange(1, 30)],
      address: [null, TValidators.textRange(1, 30)],
      template: []
    });
  }
}
