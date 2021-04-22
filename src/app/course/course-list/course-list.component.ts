import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable, of } from 'rxjs';
import { Course } from 'types/models/course';
import { QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent extends DataTableContainer<Course> implements OnInit {
  search: FormGroup;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private fb: FormBuilder
  ) {
    super(route, router);
  }

  ngOnInit() {
  }

  protected fetch(): Observable<QueryResult<Course>> {
    return of(null);
  }

  buildForm() {
    this.search = this.fb.group({
      courseName: [null],
      courseType: [null],
      teacher: [null],
    });
  }
}
