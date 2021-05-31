import {
  LocationStrategy,
  PathLocationStrategy,
  registerLocaleData
} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env';
import { API_BASE_URL } from '@shared/api/base-url';
import { ErrorInterceptor } from '@shared/interceptor/error.interceptor';
import { JwtInterceptor } from '@shared/interceptor/token.interceptor';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { SharedModule } from '@shared/shared.module';
import { TemplateModule } from '@shared/template/template.module';
import { vi as viVN } from 'date-fns/locale';
import { NgChartjsModule } from 'ng-chartjs';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { vi_VN, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { Error404Component } from './authentication/error404/error404.component';
import { Error500Component } from './authentication/error500/error500.component';
import { ConfigQuickContactComponent } from './config-quick-contact/config-quick-contact.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { PartnersComponent } from './partners/partners.component';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);

const ngZorroConfig: NzConfig = {
  modal: {
    nzMaskClosable: false,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
    Error404Component,
    Error500Component,
    ConfigQuickContactComponent,
    PartnersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NgChartjsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: NZ_I18N,
      useValue: vi_VN,
    },
    {
      provide: NZ_CONFIG,
      useValue: ngZorroConfig,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: API_BASE_URL,
      useValue: environment.api,
    },
    {
      provide: NZ_DATE_LOCALE,
      useValue: viVN
    },
    ThemeConstantService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
