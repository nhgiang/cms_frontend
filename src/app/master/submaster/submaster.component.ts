import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubMasterApiService } from '@shared/api/submaster.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime } from 'rxjs/operators';
import { User } from 'types/typemodel';

@Component({
  selector: 'app-assistance',
  templateUrl: './submaster.component.html',
})
export class SubMasterComponent
  extends DataTableContainer<User>
  implements OnInit
{
  search: FormGroup;

  constructor(
    private apiService: SubMasterApiService,
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
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((params) => {
      this.onSearchParamsChanged(params);
    });
    this.search.patchValue(this.params);
  }

  fetch() {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    const { q } = this.params;
    return this.apiService.getList({ ...params, q });
  }

  deleteAssistance(id: string) {
    const next = () => {
      this.refresh();
      this.notification.success(
        'Thành công',
        'Xóa thông tin nhân viên thành công!'
      );
    };
    const error = () => {
      this.notification.error('Thất bại', 'Xóa thông tin nhân viên thất bại!');
    };
    this.apiService.delete(id).subscribe(next, error);
  }

  buildform() {
    this.search = this.fb.group({
      q: [null],
    });
  }
}
