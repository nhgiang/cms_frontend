import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hottest-course',
  templateUrl: './hottest-course.component.html',
  styleUrls: ['./hottest-course.component.scss']
})
export class HottestCourseComponent implements OnInit {
  dummy: number[];
  form: FormArray;

  constructor(
    private courseApi: CourseApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.dummy = Array(10).fill(0);
    this.form = this.fb.array(this.dummy.map(() => this.fb.group({
      courseId: [null]
    })))
  }

  courses = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.name };
    })))
  }

  submit() {

  }
}
