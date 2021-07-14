import { Component, OnInit } from '@angular/core';
import { PartnerPackageApiService } from '@shared/api/partner-packages.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { Entity } from 'types/typemodel';

interface PartnerPackage extends Entity {
  name: string;
  maxStorage: number;
  maxStudents: number;
  monthlyPrice: number;
  days: number;
}

@Component({
  selector: 'app-partner-packages-list',
  templateUrl: 'partner-packages-list.component.html',
})
export class PartnerPackagesListComponent implements OnInit {
  list: any = [];
  isloading = false;
  constructor(
    private readonly api: PartnerPackageApiService,
    private readonly notif: NzNotificationService
  ) {
    //$$test conflicts & delete codes notif (workflow)
  }
  ngOnInit() {
    this.fetch();
  }
  protected fetch() {
    this.isloading = true;
    this.api
      .getList()
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe((data: any) => {
        this.list = data.map((value, i) => ({
          index: i + 1,
          ...value,
        }));
      });
  }

  protected remove(id) {
    this.api.remove(id).subscribe(() => {
      this.notif.success('Thành công', 'Xóa gói sản phẩm thành công!');
      this.fetch();
    });
  }
}
