import { EventsOrganizeComponent } from './events-organize/events-organize.component';
import { EventsRoutes } from './events.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [CommonModule, SharedModule, EventsRoutes, AngularEditorModule],
  declarations: [
    EventsOrganizeComponent,
    EventListComponent,
    EventDetailComponent,
    EventCreateComponent,
  ],
})
export class EventsModule {}
