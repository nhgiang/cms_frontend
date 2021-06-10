import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsApiService } from '@shared/api/analytics.api.service';
import { CourseTypesApiService } from '@shared/api/course-types.api.service';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { Option } from '@shared/interfaces/option.type';
import { CourseType, QueryResult, User } from 'types/typemodel';

@Component({
  selector: 'app-courses-analtytics',
  templateUrl: 'courses-analytics.component.html',
})
export class CoursesAnalyticsComponent implements OnInit {
  coursesAnalytics: any;
  isDataLoading = false;
  totalCourses: number;
  totalStudents: number = 0;

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
  courseTypes$ = (params: any) => {
    return this.courseTypesApi.getList(params).pipe(
      map((data: QueryResult<CourseType>) => {
        return <Option[]>(
          data.items.map((item) => ({ value: item.id, label: item.name }))
        );
      })
    );
  };

  queryForm: FormGroup;

  constructor(
    private analyticsApi: AnalyticsApiService,
    private fb: FormBuilder,
    private teachersApi: TeacherApiService,
    private courseTypesApi: CourseTypesApiService
  ) {}

  ngOnInit() {
    this.fetch();
    this.queryForm = this.fb.group({
      typeId: [],
      userId: [], //teacherId
    });
    this.queryForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.fetch({ typeId: value.typeId, userId: value.userId });
    });
  }

  protected fetch(params?: { [key: string]: any }) {
    this.isDataLoading = true;
    this.analyticsApi
      .getCourseAnalytics(params)
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((data: any) => {
        this.totalStudents = 0;
        this.totalCourses = data.length;
        this.coursesAnalytics = data.map((item: any, index: number) => {
          item.index = index + 1;
          this.totalStudents = this.totalStudents + parseInt(item.totalStudent);

          return item;
        });
      });
  }
}

//check if to bundle all types of report into one module
