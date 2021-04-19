import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';

@Component({
  selector: 'app-course-type-create',
  templateUrl: './course-type-create.component.html',
  styleUrls: ['./course-type-create.component.scss']
})
export class CourseTypeCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required]
    });
  }

  submit() {
    console.log(this.form);
    Ultilities.validateForm(this.form);
  }
}
