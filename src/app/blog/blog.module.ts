import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogTypeComponent } from './blog-type/blog-type.component';
import { SharedModule } from '@shared/shared.module';
import { BlogTypeCreateComponent } from './blog-type/blog-type-create/blog-type-create.component';
import { BlogTypeEditComponent } from './blog-type/blog-type-edit/blog-type-edit.component';
import { BlogHottestComponent } from './blog-hottest/blog-hottest.component';
import { BlogCreateComponent } from './blog-list/blog-create/blog-create.component';
import { JwtInterceptor } from '@shared/interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogEditComponent } from './blog-list/blog-edit/blog-edit.component';


@NgModule({
  declarations: [
    BlogListComponent,
    BlogTypeComponent,
    BlogTypeCreateComponent,
    BlogTypeEditComponent,
    BlogHottestComponent,
    BlogCreateComponent,
    BlogEditComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    },
  ]
})
export class BlogModule { }
