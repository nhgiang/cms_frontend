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
import * as moment from 'moment';


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
    this.search.patchValue({
      ...this.params,
      status: this.params.status === 'GoingToHappen' ? 'Submitted' : this.params.status
    }, { emitEvent: false });
    this.search.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      this.onSearchParamsChanged({ ...value, status: value.status === 'Submitted' ? 'GoingToHappen' : value.status });
    });
  }

  protected fetch(): Observable<QueryResult<EventEntity>> {
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

  protected handleResult(result: QueryResult<EventEntity>) {
    this.meta = result.meta;
    this.items = result.items.map((item: EventEntity, index) => {
      let status = item.status;
      if (status === EventStatus.Submitted && !moment().isBefore(item.startAt)) {
        status = moment().isBetween(item.startAt, item.endAt) ? EventStatus.Happening : EventStatus.Done;
      }
      return {
        ...item,
        index: index + 1 + (this.page - 1) * this.quantity,
        status
      };
    });
  }

  buildForm() {
    this.search = this.fb.group({
      q: [],
      status: [],
      typeIds: []
    });
  }
}
