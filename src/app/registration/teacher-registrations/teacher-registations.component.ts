import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeacherRegistrationsApiService } from '@shared/api/teacher-registrations.api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { debounceTime, finalize, switchMap } from 'rxjs/operators';
import { Meta, Teacher } from 'types/typemodel';

@Component({
  selector: 'app-teacher-registrations',
  templateUrl: './teacher-registrations.component.html',
})
export class TeachersRegistrationsComponent implements OnInit {
  teachers: Teacher[] = [];
  meta = {} as Meta;
  isDataLoading = false;
  searchQuery: FormControl;
  constructor(
    private serviceApi: TeacherRegistrationsApiService,
    private notif: NzNotificationService
  ) {}

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
    return this.serviceApi
      .getList({ page, q: searchQuery })
      .pipe(finalize(() => (this.isDataLoading = false)));
  }

  protected updateObserver(): Observer<any> {
    return {
      next: (data) => {
        this.meta = data.meta;
        this.teachers = data.items.map((item: Teacher, index: number) => ({
          ...item,
          teacherIndex:
            index + 1 + (this.meta.currentPage - 1) * this.meta.itemsPerPage,
        }));
      },
      error() {},
      complete() {},
    };
  }

  onPageIndexChange(page: number) {
    this.fetch(page, this.searchQuery.value).subscribe(this.updateObserver());
  }

  protected deleteTeacher(teacher: Teacher) {
    this.isDataLoading = true;
    this.serviceApi.delete(teacher.id).subscribe(() => {
      this.notif.success('Thành công', 'Xóa giảng viên thành công');
      this.fetch(1, undefined).subscribe(this.updateObserver()); // refresh
    });
  }
}
