import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingApiService, SettingVisibleApiService } from '@shared/api/setting.api.service';
import { StorageApiService } from '@shared/api/storage.api.service';
import { SettingContainer } from '@shared/class/setting-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AssetType, SettingKey, SettingKeyEndPoint } from 'types/enums';
import { Header } from 'types/typemodel';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends SettingContainer<Header> implements OnInit {
  form: FormGroup;
  assetType = AssetType;
  protected handleResult(result: { res: Header; isVisible: boolean; }) {
    throw new Error('Method not implemented.');
  }
  protected buildForm(): void {
    throw new Error('Method not implemented.');
  }
  protected handleResulVisible() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private fb: FormBuilder,
    settingApi: SettingApiService<Header>,
    settingVisibleApi: SettingVisibleApiService,
    private notification: NzNotificationService,
    private storageApi: StorageApiService
  ) { 
    super(settingVisibleApi, settingApi, SettingKey.HomepageHeader, SettingKeyEndPoint.HomepageHeader);
  }

  ngOnInit(): void {
  }

  submit() {

  }
}
