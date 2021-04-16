import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageApiService } from '@shared/api/storage.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { AssetType } from 'types/enums';
@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent implements OnInit {
  form: FormGroup;
  AssetType = AssetType;
  constructor(private fb: FormBuilder, private storageApi: StorageApiService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, TValidators.required],
      video: [null]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);

    this.storageApi.uploadFile();
  }
}
