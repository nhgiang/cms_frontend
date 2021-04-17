import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ContactRoutes } from './contact.routing';
import { AboutUsComponent } from './about-us/about-us.component';
import { StoryComponent } from './story/story.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutes
  ],
  declarations: [
    AboutUsComponent,
    StoryComponent
  ]
})
export class ContactModule { }
