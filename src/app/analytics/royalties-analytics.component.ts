import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { finalize, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoyaltiesAnalyticsApiService } from '@shared/api/royalties-analytics.api.service';
import { Meta } from 'types/typemodel';
import { AccountType } from 'types/enums';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-royalties-analytics',
  templateUrl: 'royalties-analytics.component.html',
  styleUrls: ['royalties-analytics.component.scss'],
})
export class RoyaltiesAnalyticsComponent implements OnInit {
  isDataLoading = false;
  studentViewMeta = {} as Meta;
  studentViewItems: any = [];
  teacherViewMeta = {} as Meta;
  teacherViewItems: any = [];
  queryForm: FormGroup;
  accountType = AccountType;
  @ViewChild('drawer') drawer: TemplateRef<any>;

  constructor(
    private royaltiesApi: RoyaltiesAnalyticsApiService,
    private drawerService: NzDrawerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.queryForm = this.fb.group({
      accountType: [],
      teacherId: [],
    });
    this.queryForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.fetchStudentView({
        teacherId: value.teacherId,
        type: value.accountType,
      });
    });
    this.fetchStudentView();
  }

  protected fetchStudentView(params?: { [key: string]: any }) {
    this.isDataLoading = true;
    return this.royaltiesApi
      .getStudentView(params)
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data: any) => {
        this.studentViewMeta = data.meta;
        this.studentViewItems = data.items.map((item, index) => {
          return {
            ...item,
            index:
              (data.meta.currentPage - 1) * data.meta.itemsPerPage + index + 1,
          };
        });
      });
  }

  protected fetchTeacherView(params?: { [key: string]: any }) {
    return this.royaltiesApi.getTeacherView(params).subscribe((data: any) => {
      this.teacherViewMeta = data.meta;
      this.teacherViewItems = data.items.map((item, index) => {
        const i =
          (data.meta.currentPage - 1) * data.meta.itemsPerPage + index + 1;
        return {
          ...item,
          index: i,
        };
      });
    });
  }
  toggleDrawer() {
    this.fetchTeacherView()
    this.drawerService.create({
      nzContent: this.drawer,
      nzBodyStyle: { padding: '35px' },
      nzWidth: 550,
    });
  }
  onPageStudentViewChange(page: number) {
    this.fetchStudentView({ page });
  }
  onPageTeacherViewChange(page: number) {
    this.fetchTeacherView({ page });
  }
}
