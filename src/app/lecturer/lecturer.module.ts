import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturerComponent } from './lecturer.component';
import { LecturerRoutes } from './lecturer.routing';

@NgModule({
  imports: [
    CommonModule,
    LecturerRoutes
  ],
  declarations: [LecturerComponent]
})
export class LecturerModule { }
