import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { registerLocaleData, PathLocationStrategy, LocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';


import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

import { NgChartjsModule } from 'ng-chartjs';
import { AppRoutes } from './app.routing';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
import { SharedModule } from '@shared/shared.module';
import { TemplateModule } from '@shared/template/template.module';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@shared/interceptor/token.interceptor';
import { ErrorInterceptor } from '@shared/interceptor/error.interceptor';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        FullLayoutComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        NzBreadCrumbModule,
        TemplateModule,
        SharedModule,
        NgChartjsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor, multi: true
        },
        {
            provide: NZ_I18N,
            useValue: en_US,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        },
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        },
        ThemeConstantService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
