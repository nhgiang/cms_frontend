import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { QueryResult, User } from 'types/typemodel';
import { Option } from '@shared/interfaces/option.type';
import { map, finalize, switchMap, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoyaltiesAnalyticsApiService } from '@shared/api/royalties-analytics.api.service';
import { Meta } from 'types/typemodel';
import { AccountType } from 'types/enums';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-royalties-analytics',
  templateUrl: 'royalties-analytics.component.html',
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

  format = (val: number) => {
    return new Intl.NumberFormat().format(val);
  };
  teachers$ = (params: any) => {
    return this.teachersApi.getList(params).pipe(
      map((data: QueryResult<User>) => {
        return <Option[]>data.items.map((item) => ({
          value: item.id,
          label: item.fullName,
        }));
      })
    );
  };
  constructor(
    private teachersApi: TeacherApiService,
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
    this.fetchTeacherView();
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
    this.drawerService.create({
      nzContent: this.drawer,
      nzBodyStyle: { padding: '35px' },
      nzWidth: 550,
    });
  }
  onPageStudentViewChange(page: number) {
    this.fetchStudentView({ page: page });
  }
  onPageTeacherViewChange(page: number){
    this.fetchTeacherView({page: page})
  }

}
