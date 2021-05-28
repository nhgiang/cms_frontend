import { Component, OnInit } from '@angular/core';
import { Partner, Meta } from 'types/typemodel';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { finalize, debounceTime, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  meta = {} as Meta;
  isDataLoading = false;
  searchQuery: FormControl;
  constructor(
    private partnersApi: PartnersApiService,
    private notif: NzNotificationService
  ) {}

  ngOnInit() {
    this.fetch(1, undefined) //fetch no queries on init
      .subscribe(this.updateObserver());

    this.searchQuery = new FormControl('');
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.fetch(1, value))
      )
      .subscribe(this.updateObserver());
  }

  protected fetch(page, searchQuery): Observable<any> {
    this.isDataLoading = true;
    return this.partnersApi
      .getList({ page: page, q: searchQuery })
      .pipe(finalize(() => (this.isDataLoading = false)));
  }

  protected updateObserver(): Observer<any> {
    return {
      next: (data) => {
        this.meta = data.meta;
        this.partners = data.items;
      },
      error() {},
      complete() {},
    };
  }

  onPageIndexChange(page) {
    this.fetch(page, this.searchQuery.value).subscribe(this.updateObserver());
  }

  protected deletePartner(partner) {
    this.isDataLoading = true;
    this.partnersApi.delete(partner.id).subscribe(() => {
      this.notif.success('Thành công', 'Xóa đối tác thành công');
      this.fetch(1, undefined).subscribe(this.updateObserver()); //refresh
    });
  }
}
