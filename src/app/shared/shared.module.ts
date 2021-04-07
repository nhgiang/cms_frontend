import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ThemeConstantService } from './services/theme-constant.service';
import { SearchPipe } from './pipes/search.pipe';
import { ZorroAntdModule } from './zorro-antd.module';
import { OptionPipe } from './pipes/option.pipe';
import { DatetimePipe } from './pipes/datetime.pipe';
import { ImageCropperModalComponent } from './components/image-cropper-modal/image-cropper-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperDirective } from './directives/image-cropper.directive';
import { ConfirmationComponent } from './components/confirmation/confirmation.Component';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ZorroAntdModule,
        PerfectScrollbarModule,
        SearchPipe,
        OptionPipe,
        DatetimePipe,
        ImageCropperModalComponent,
        ImageCropperDirective,
        ConfirmationComponent
    ],
    imports: [
        RouterModule,
        ImageCropperModule,
        ZorroAntdModule,
        CommonModule
    ],
    declarations: [
        SearchPipe,
        OptionPipe,
        DatetimePipe,
        ImageCropperModalComponent,
        ImageCropperDirective,
        ConfirmationComponent
    ],
    providers: [
        ThemeConstantService
    ]
})

export class SharedModule { }
