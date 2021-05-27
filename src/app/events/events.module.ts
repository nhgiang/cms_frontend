import {EventsListComponent} from './events-list/events-list.component'
import {EventsOrganizeComponent} from './events-organize/events-organize.component';
import {EventsRoutes} from './events.routing';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';


@NgModule({
    imports: [CommonModule, SharedModule, EventsRoutes],
    declarations: [EventsListComponent, EventsOrganizeComponent],
})
export class EventsModule {}