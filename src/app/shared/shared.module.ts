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
import { RouterMatchDirective } from './directives/router-match.directive';
import { SelectAdvanceComponent } from './controls/select-advance/select-advance.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { FileUploadControlComponent } from './components/file-upload-control/file-upload-control.component';

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
    ConfirmationComponent,
    RouterMatchDirective,
    SelectAdvanceComponent,
    UploadVideoComponent,
    FileUploadControlComponent
  ],
  imports: [
    RouterModule,
    ImageCropperModule,
    ZorroAntdModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchPipe,
    OptionPipe,
    DatetimePipe,
    ImageCropperModalComponent,
    ImageCropperDirective,
    ConfirmationComponent,
    RouterMatchDirective,
    SelectAdvanceComponent,
    UploadVideoComponent,
    FileUploadControlComponent
  ],
  providers: [
    ThemeConstantService
  ]
})

export class SharedModule { }
