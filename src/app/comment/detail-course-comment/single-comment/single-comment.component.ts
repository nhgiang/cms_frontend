import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommentApiService } from '@shared/api/comment.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  @Input() type: 'Comment' | 'Reply';
  @Input() data: any;
  @Input() search: boolean = false;
  @Output() deleteData = new EventEmitter();
  children: any[] = [];
  pagination = { page: 1, limit: 100 };
  totalPage: number;
  constructor(
    private commentApiService: CommentApiService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit() {
    if (this.type === 'Comment' && !this.search) {
      this.getData().subscribe(res => {
        this.children = res.items;
        this.totalPage = res.meta.totalPages;
      });
    }
  }

  increasePage() {
    this.pagination.page++;
    this.getData().subscribe(res => {
      this.children = this.children.concat(res.items);
    });
  }

  getData(): Observable<any> {
    return this.commentApiService.get({ parentId: this.data.id, ...this.pagination }).pipe(
      map(res => {
        res.items.forEach(x => {
          x.fullName = (x.role === 'Teacher') ? 'Giảng viên ' + x.fullName || x.email : x.fullName || x.email;
          return x;
        });
        return res;
      })
    );
  }

  navigate(data) {
    const role = data.role === 'Teacher' ? 'lecturer' : 'student';
    this.router.navigate(['/user', role, data.userId]);
  }

  deleteItem(id: string) {
    this.commentApiService.delete(id).pipe(
      tap(() => {
        this.deleteData.emit();
      }),
    ).subscribe(() => {
      this.notification.success('Thành công', 'Xóa comment thành công');
    });
  }

  getList() {
    this.getData().pipe(tap(() => this.pagination.page = 1)).subscribe(res => {
      this.children = res.items;
    });
  }

  get message() {
    return this.type === 'Comment' ? 'Khi comment chính bị xoá, các comment phụ sẽ bị xoá theo. Bạn có chắc chắn?' : 'Bạn có chắc muốn xóa comment này không?';
  }
}
