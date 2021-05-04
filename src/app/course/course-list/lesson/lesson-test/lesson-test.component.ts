import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesson-test',
  templateUrl: './lesson-test.component.html',
  styleUrls: ['./lesson-test.component.scss']
})
export class LessonTestComponent implements OnInit {

  questionType: 'Single' | 'Multiple';
  correctAnswer: string[];
  form: FormGroup;
  answer = [1, 2, 3, 4];

  constructor(
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(console.log);
  }

  buildForm() {
    this.form = this.fb.group({
      lessionId: [],
      title: null,
      point: null,
      questions: null
    });
  }

}
