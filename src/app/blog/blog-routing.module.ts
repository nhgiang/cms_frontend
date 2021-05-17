import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogHottestComponent } from './blog-hottest/blog-hottest.component';
import { BlogCreateComponent } from './blog-list/blog-create/blog-create.component';
import { BlogEditComponent } from './blog-list/blog-edit/blog-edit.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogTypeComponent } from './blog-type/blog-type.component';

const routes: Routes = [
  {
    path: 'blog-management',
    children: [
      {
        path: '',
        component: BlogListComponent,
        data: {
          title: 'Danh sách bài viết'
        }
      },
      {
        path: 'create',
        component: BlogCreateComponent,
        data: {
          title: 'Thêm mới bài viết'
        }
      },
      {
        path: ':id',
        component: BlogEditComponent,
        data: {
          title: 'Cập nhật bài viết'
        }
      }
    ]
  },
  {
    path: 'type',
    component: BlogTypeComponent,
    data: {
      title: 'Danh sách loại bài viết'
    }
  },
  {
    path: 'hottest',
    component: BlogHottestComponent,
    data: {
      title: 'Bài viết hot nhất'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
