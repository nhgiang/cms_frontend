import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseApiService } from '@shared/api/course.api.service';
import { IPaginate } from '@shared/interfaces/paginate.type';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.scss']
})
export class ComboFormComponent implements OnInit {
  form: FormGroup;
  submiting: boolean;
  objKey: any;
  get formArrayControls() {
    return this.form && this.form.get('courses') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private courseApi: CourseApiService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.form.get('courses'))

  }

  buildForm() {
    this.form = this.fb.group({
      courses: this.fb.array([1, 2, 3].map(() => this.fb.group({
        courseId: [null]
      }))),
      oldPrice: [null, Validators.required],
      newPrice: [null, Validators.required],
    });
  }

  courses$ = (params: IPaginate) => {
    return this.courseApi.getList(params).pipe(
      tap(res => res.items.forEach(course => this.objKey[course.id] = course)),
      // tslint:disable-next-line: max-line-length
      map(res => res.items.map(x => ({ value: x.id, label: x.name })))
    );
  }
}
