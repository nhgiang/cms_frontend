import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  form: FormGroup;
  faqIndexs = [];
  submiting: boolean;

  get itemsControlArray() {
    return this.form.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  buildform() {
    this.form = this.fb.group({
      items: this.controlTeacher()
    });
  }

  controlTeacher() {
    return this.fb.group({
      
    });
  }
}
