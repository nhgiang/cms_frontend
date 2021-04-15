import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TValidators } from '@shared/extentions/validators';

@Component({
  selector: 'app-video-intro',
  templateUrl: './video-intro.component.html',
  styleUrls: ['./video-intro.component.scss']
})
export class VideoIntroComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      title: [null, TValidators.required],
      image: [null, TValidators.required],
      video: [null]
    });
  }

  submit() {
    console.log(this.form.value);
  }
}
