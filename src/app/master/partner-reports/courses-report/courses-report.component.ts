import { Component, OnInit } from '@angular/core';
import { CourseApiService } from '@shared/api/course.api.service';
import { PartnersCoursesApiService } from '@shared/api/partners-courses.api.service';
import { PartnersApiService } from '@shared/api/partners.api.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-courses-report',
  templateUrl: 'courses-report.component.html',
})
export class CoursesReportComponent implements OnInit {
  constructor(
    private readonly analyticsApi: PartnersCoursesApiService,
    private readonly partnersApi: PartnersApiService,
    private readonly coursesApi: CourseApiService
  ) {}

  isDataLoading = false;
  partners: any = [];
  coursesData: any = [];
  analytics = [];
  courses: any = []; //meta + items

  ngOnInit() {
    this.fetch();
  }

  protected fetch() {
    this.isDataLoading = true;
    forkJoin({
      courses: this.coursesApi.getList({}),
      partners: this.partnersApi.getAll(),
      analytic: this.analyticsApi.analytics(),
    })
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((obj: any) => {
        this.courses = obj.courses;
        this.coursesData = obj.courses.items.map((i) => ({
          id: i.id,
          name: i.name,
        }));
        this.partners = obj.partners.items.map((i) => ({
          id: i.id,
          name: i.name,
        }));
        this.analytics = obj.analytic;

        this.tableView();
      });
  }

  protected tableView() {
    for (const c of this.coursesData) {
      c.dataByPartners = [];
      for (const p of this.partners) {
        const datum = this.analytics.find(
          (item) => item.partnerId === p.id && item.courseId === c.id
        );
        if (!datum)
          c.dataByPartners.push({
            certed: 0,
            total: 0,
            render: 'Chưa có học viên',
          });
        else
          c.dataByPartners.push({
            certed: datum.certedStudents,
            total: datum.totalStudents,
            render: datum.certedStudents + '/' + datum.totalStudents,
          });
      }
    }
  }

  onPageChange(index) {
    this.isDataLoading = true;
    this.coursesApi
      .getList({ page: index })
      .pipe(finalize(() => (this.isDataLoading = false)))
      .subscribe((val) => {
        this.courses = val;
        this.coursesData = this.courses.items.map((i) => ({
          id: i.id,
          name: i.name,
        }));
        this.tableView();
      });
  }
}
