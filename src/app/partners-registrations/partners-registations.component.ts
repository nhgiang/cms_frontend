import { Component, OnInit } from '@angular/core';
import { Partner, Meta } from 'types/typemodel';
import { PartnersRegistrationsApiService } from '@shared/api/partners-registrations.api.service';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-partners',
  templateUrl: './partners-registrations.component.html',
})
export class PartnersRegistrationsComponent implements OnInit {
  partners: Partner[] = [];
  meta = {} as Meta;
  isDataLoading = false;
  searchQuery: FormControl;
  constructor(
    private partnersRegistrationsApi: PartnersRegistrationsApiService,
    private notif: NzNotificationService
  ) { }

  ngOnInit() {
    this.fetch(1, undefined).subscribe(this.updateObserver());
    this.searchQuery = new FormControl('');
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.fetch(1, value))
      )
      .subscribe(this.updateObserver());
  }

  protected fetch(page: number, searchQuery: any): Observable<any> {
    this.isDataLoading = true;
    return this.partnersRegistrationsApi
      .getList({ page, q: searchQuery })
      .pipe(finalize(() => (this.isDataLoading = false)));
  }

  protected updateObserver(): Observer<any> {
    return {
      next: (data) => {
        this.meta = data.meta;
        this.partners = data.items.map((item: Partner, index: number) => ({
          ...item,
          partnerIndex:
            index + 1 + (this.meta.currentPage - 1) * this.meta.itemsPerPage,
        }));
      },
      error() { },
      complete() { },
    };
  }

  onPageIndexChange(page: number) {
    this.fetch(page, this.searchQuery.value).subscribe(this.updateObserver());
  }

  protected deletePartner(partner: Partner) {
    this.isDataLoading = true;
    this.partnersRegistrationsApi.delete(partner.id).subscribe(() => {
      this.notif.success('Thành công', 'Xóa đối tác thành công');
      this.fetch(1, undefined).subscribe(this.updateObserver()); // refresh
    });
  }
}
