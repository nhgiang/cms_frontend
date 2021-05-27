import { Component, OnInit } from '@angular/core';
import { Partner, Meta } from 'types/typemodel';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { finalize, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  meta = {} as Meta;
  isDataLoading = false;
  searchQuery: FormControl;
  constructor(private partnersApi: PartnersApiService) {}

  ngOnInit() {
    this.fetch(1, undefined);
    //fetch no queries on init
    this.searchQuery = new FormControl('');
    this.searchQuery.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.fetch(1, value);
    });
  }

  protected fetch(page, searchQuery) {
    this.isDataLoading = true;
    this.partnersApi
      .getList({ page: page, q: searchQuery })
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data) => {
        this.meta = data.meta;
        this.partners = data.items;
      });
  }

  onPageIndexChange(page) {
    this.fetch(page, this.searchQuery.value);
  }
}
