import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { AuthenticationService } from '@shared/services/authentication.service';
import { DestroyService } from '@shared/services/destroy.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { QueryResult } from 'types/typemodel';
import { PartnersEditComponent } from '../partners-edit/partners-edit.component';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.scss'],
  providers: [DestroyService]
})
export class PartnersListComponent extends DataTableContainer<any> {
  form: FormGroup;
  @ViewChild('footerModal') footerModal: TemplateRef<any>;
  metaData = [
    {
      key: 'name',
      name: 'Tên trung tâm',
      sortable: false,
    },
    {
      key: 'domain',
      name: 'Tên miền',
      sortable: false,
    }, {
      key: 'username',
      name: 'Đại diện',
      sortable: false,
    },
    {
      key: 'phone',
      name: 'Số điện thoại',
      sortable: false,
    },
  ];
  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder,
    private partnersApiService: PartnersApiService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private destroy$: DestroyService,
    private authenticationService: AuthenticationService
  ) {
    super(route, router);
    this.buildForm();
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<any>> {
    const params = {
      limit: this.quantity,
      page: this.page,
      sort: this.sort,
      order: this.order
    };
    const { q } = this.params;
    return this.partnersApiService.getList({ ...params, q });
  }

  edit(data: any) {
    this.modal.create({
      nzTitle: 'Cập nhật thông tin đối tác',
      nzContent: PartnersEditComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
    }).afterClose.pipe(filter(x => x), takeUntil(this.destroy$)).subscribe(() => this.refreshTrigger.next());
  }

  delete(id: string) {
    const next = () => {
      this.notification.success('Thành công', 'Xóa thông tin đối tác thành công!');
    };
    const err = () => {
      this.notification.error('Thất bại', 'Xóa thông tin đối tác thất bại!');
    };
    this.partnersApiService.delete(id).subscribe(next, err);
  }

  buildForm() {
    this.form = this.fb.group({
      q: [null]
    });
  }

  impersonation(partner: any) {
    this.authenticationService.storageAnonymousPartnerValue(partner);
    this.router.navigate(['']);
  }
}
