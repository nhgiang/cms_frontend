import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventTypeApiService } from '@shared/api/event-type.api.service';
import { EventApiService } from '@shared/api/event.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Option } from '@shared/interfaces/option.type';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EventStatus, EventStatusOptions } from 'types/enums';
import { EventEntity, QueryResult } from 'types/typemodel';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent extends DataTableContainer<EventEntity> implements OnInit {
  eventStatusOptions = EventStatusOptions;
  search: FormGroup;
  eventStatus = EventStatus;
  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder,
    private evenntApi: EventApiService,
    private eventTypeApi: EventTypeApiService
  ) {
    super(route, router);
    this.quantity = 5;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
    this.search.patchValue(this.params, { emitEvent: false });
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSearchParamsChanged(value);
    });
  }

  protected fetch(): Observable<QueryResult<EventEntity>> {
    console.log(this.quantity)
    const params = {
      limit: this.quantity,
      page: this.page
    };
    const { q, status, typeIds } = this.params;
    return this.evenntApi.getList({ ...params, q, status, typeIds });
  }

  eventTypes$ = (params: {
    page: number,
    limit: number
  }): Observable<Option[]> => {
    return this.eventTypeApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.title };
    })));
  }

  buildForm() {
    this.search = this.fb.group({
      q: [],
      status: [],
      typeIds: []
    });
  }
}
