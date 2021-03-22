import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from '@shared/shared.module';

const antdModule = [
    NzButtonModule,
];

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutes,
        ...antdModule
    ],
    exports: [],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
