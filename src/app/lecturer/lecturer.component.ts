import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent extends DataTableContainer<User> implements OnInit {
  search: FormGroup;
  specializations: any[];
  constructor(
    private teacherApi: TeacherApiService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.specializations = data.specializations;
    });
    this.buildform();
    super.ngOnInit();
    this.search.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(params => {
      this.onSearchParamsChanged(params);
    });
  }

  fetch() {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { specializationId, q } = this.params;
    return this.teacherApi.getList({ ...params, specializationId, q });
  }

  deleteTeacher(id) {
    const next = () => {
      this.refresh();
      this.notification.success('Thành công', 'Xóa thông tin giảng viên thành công!');
    };
    const error = () => {
      this.notification.success('Thất bại', 'Xóa thông tin giảng viên thất bại!');
    };
    this.teacherApi.delete(id).subscribe(next, error);
  }

  buildform() {
    this.search = this.fb.group({
      q: [null],
      specializationId: [null]
    });
  }
}
