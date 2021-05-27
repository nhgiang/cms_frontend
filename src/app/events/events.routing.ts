import {Routes, RouterModule} from '@angular/router';
import {EventsListComponent} from './events-list/events-list.component';
import {EventsOrganizeComponent} from './events-organize/events-organize.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: 'list', 
        component: EventsListComponent,
        data: {
            title: "Danh sách sự kiện"
        }
    }, 
    {
        path: 'organize', 
        component: EventsOrganizeComponent,
        data: {
            title: "Phân loại sự kiện"
        }
    }
];

export const EventsRoutes = RouterModule.forChild(routes)
