import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistanceApiService } from '@shared/api/assistance.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss']
})
export class AssistanceComponent extends DataTableContainer<User> implements OnInit {
  search: FormGroup;

  constructor(
    private teacherApi: AssistanceApiService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    route: ActivatedRoute,
    router: Router
  ) {
    super(route, router);
  }

  ngOnInit() {
    this.buildform();
    super.ngOnInit();
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(params => {
      this.onSearchParamsChanged(params);
    });
    this.search.patchValue(this.params);
  }

  fetch() {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { q } = this.params;
    return this.teacherApi.getList({ ...params, q });
  }

  deleteTeacher(id: string) {
    const next = () => {
      this.refresh();
      this.notification.success('Thành công', 'Xóa thông tin giảng viên thành công!');
    };
    const error = () => {
      this.notification.success('Thất bại', 'Xóa thông tin giảng viên thất bại!');
    };
    // this.teacherApi.delete(id).subscribe(next, error);
  }

  buildform() {
    this.search = this.fb.group({
      q: [null]
    });
  }
}
