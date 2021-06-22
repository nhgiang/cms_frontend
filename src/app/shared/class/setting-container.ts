import { Injectable, OnInit } from "@angular/core";
import { SettingApiService, SettingVisibleApiService } from "@shared/api/setting.api.service";
import { forkJoin } from "rxjs";
import { finalize, pluck } from "rxjs/operators";
import { SettingKey, SettingKeyEndPoint } from "types/enums";

@Injectable()
// tslint:disable-next-line: component-class-suffix
export abstract class SettingContainer<T> implements OnInit {
  isVisible: boolean;
  isLoading: boolean;

  constructor(
    private settingVisibleApi: SettingVisibleApiService,
    private settingApi: SettingApiService<T>,
    private settingKey: SettingKey,
    private settingKeyEndPoint: SettingKeyEndPoint
  ) {
    this.settingApi.setEnpoint(this.settingKeyEndPoint)
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetch();
  }

  protected fetch() {
    forkJoin({
      res: this.settingApi.get(),
      isVisible: this.settingVisibleApi.get(this.settingKey).pipe(pluck('visible'))
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(res => {
      this.handleResult(res);
    });
  };

  post(data: any) {
    return this.settingApi.post(data)
  }

  protected abstract handleResult(result: { res: T, isVisible: boolean });
  protected abstract buildForm(): void;

  visible(e: boolean) {
    this.isLoading = true;
    this.settingVisibleApi.update(this.settingKey, { visible: e }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(this.handleResulVisible);
  }

  protected abstract handleResulVisible();  
}