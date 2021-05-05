import { Component, OnInit } from '@angular/core';
import { CourseApiService } from '@shared/api/course.api.service';

@Component({
  selector: 'app-hottest-course',
  templateUrl: './hottest-course.component.html',
  styleUrls: ['./hottest-course.component.scss']
})
export class HottestCourseComponent implements OnInit {
  dummy: number[];

  constructor(
    private courseApi: CourseApiService
  ) { }

  ngOnInit(): void {
    this.dummy = Array(10).fill(0);
  }

  // courses () {
  //   return this.
  // }
}
