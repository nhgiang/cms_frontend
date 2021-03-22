import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { AuthenticationRoutes } from './authentication.routing';
import { SharedModule } from '@shared/shared.module';

const antdModule = [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AuthenticationRoutes,
        ...antdModule
    ],
    declarations: [
        LoginComponent,
        Error404Component,
        Error500Component
    ]
})

export class AuthenticationModule { }