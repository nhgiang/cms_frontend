import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Option } from '@shared/interfaces/option.type';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-lecturer',
  templateUrl: './lecturer.component.html',
  styleUrls: ['./lecturer.component.scss']
})
export class LecturerComponent extends DataTableContainer<User> implements OnInit {
  search: FormGroup;
  // specializations: (p) => Observable<any>;
  constructor(
    private teacherApi: TeacherApiService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private specializationApi: SpecializationApiService
  ) {
    super();
  }

  ngOnInit() {
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

  deleteTeacher(id: string) {
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

  specializations = (params: IPaginate): Observable<Option[]> => {
    return this.specializationApi.getAll(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })));
  }
}
