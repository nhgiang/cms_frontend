import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventTypesApiService } from '@shared/api/event-types.api.service';
import { QueryResult, EventType, Meta } from 'types/typemodel';
import { TValidators } from '@shared/extentions/validators';
import { Ultilities } from '@shared/extentions/Ultilities';
import { finalize } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-events-organize',
  templateUrl: './events-organize.component.html',
})
export class EventsOrganizeComponent implements OnInit {
  events: EventType[] = [];
  meta: Meta;
  isModalVisible = false;
  isDataLoading = false;
  modalFormTitle: string;
  targetEventId = null;
  form: FormGroup;

  constructor(
    private eventTypesApi: EventTypesApiService,
    private fb: FormBuilder,
    private notif: NzNotificationService
  ) {}

  ngOnInit() {
    this.fetch();
    this.form = this.fb.group({
      eventTitle: ['', TValidators.required],
    });
  }

  protected fetch() {
    //fetch page đầu
    this.isDataLoading = true;
    this.eventTypesApi
      .getList({ page: 1 })
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data: QueryResult<EventType>) => {
        this.meta = data.meta;
        this.events = data.items;
      });
  }

  onPageIndexChange(pageIndex: number) {
    this.isDataLoading = true;
    this.eventTypesApi
      .getList({ page: pageIndex })
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data: QueryResult<EventType>) => {
        this.events = data.items;
        this.meta = data.meta;
      });
  }

  showCreateModal() {
    this.isModalVisible = true;
    this.modalFormTitle = 'Tên loại sự kiện';
    this.form.controls['eventTitle'].setValue('');
    this.targetEventId = null;
  }

  showEditModal(event: EventType) {
    this.form.controls['eventTitle'].setValue(event.title);
    this.isModalVisible = true;
    this.targetEventId = event.id;
  }

  handleCancel() {
    this.isModalVisible = false;
    this.targetEventId = null;
  }

  submitEvent() {
    Ultilities.validateForm(this.form);
    this.isDataLoading = true;
    const upsertObservable =
      this.targetEventId === null
        ? this.eventTypesApi.create(this.form.controls['eventTitle'].value)
        : this.eventTypesApi.update(this.targetEventId, {
            title: this.form.controls['eventTitle'].value,
          });

    upsertObservable
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe(() => {
        this.isModalVisible = false;
        this.fetch();
      });
  }

  deleteEvent(event) {
    this.isDataLoading = true;
    this.eventTypesApi
      .delete(event.id)
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe(
        () => this.fetch(),
        (err) => this.showErrorNoti()
      );
  }

  showErrorNoti() {
    this.notif.error(
      'Xảy ra lỗi',
      'Không thể xóa loại sự kiện này do đang liên kết với các dữ liệu khác'
    );
  }
}
