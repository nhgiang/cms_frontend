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
import { PicturesWallUploadComponent } from './controls/pictures-wall-upload/pictures-wall-upload.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { FileUploadControlComponent } from './components/file-upload-control/file-upload-control.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { CustomeCollapseStepComponent } from './components/custome-collapse/custome-collapse-step.component';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { MultipleSelectionComponent } from './controls/multiple-selection/multiple-selection.component';
import { FilesUploadControlComponent } from './components/files-upload-control/files-upload-control.component';

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
    PicturesWallUploadComponent,
    UploadVideoComponent,
    FileUploadControlComponent,
    FeedbackFormComponent,
    CustomeCollapseStepComponent,
    SafeHtmlPipe,
    MultipleSelectionComponent
  ],
  imports: [
    RouterModule,
    ImageCropperModule,
    ZorroAntdModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
    PicturesWallUploadComponent,
    UploadVideoComponent,
    FileUploadControlComponent,
    FeedbackFormComponent,
    CustomeCollapseStepComponent,
    SafeHtmlPipe,
    MultipleSelectionComponent,
    FilesUploadControlComponent
  ],
  providers: [
    ThemeConstantService
  ]
})

export class SharedModule { }
