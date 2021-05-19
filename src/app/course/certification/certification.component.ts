import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CertificationApiService } from '@shared/api/certification.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import Mustache from 'mustache';
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
    private storageApi: StorageApiService
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
      this.form.patchValue({ ...res}, { emitEvent: false });
    });
    this.form.valueChanges.subscribe(value => {
      // this.template = Mustache.render(value.template,
      //   {
      //     ...value,
      //     companyName: 'CÔNG TY TNHH TƯ VẤN VÀ ĐÀO TẠO BEAUTYUP',
      //     courseName: 'chăm sóc da cơ bản',
      //     fullName: 'Lâm tiểu vy'
      //   });
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
      }
      return this.certificateApi.update(data);
    })).subscribe();
  }

  builform() {
    this.form = this.fb.group({
      logo: [],
      signature: [],
      companyName: [],
      director: [],
      address: [],
      template: []
    });
  }
}
