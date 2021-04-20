import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeacherApiService } from '@shared/api/teacher.api.service';
import { TValidators } from '@shared/extentions/validators';
import { map } from 'rxjs/operators';
import { AssetType } from 'types/enums';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  assetType = AssetType;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private teacherApiService: TeacherApiService
  ) {
    this.form = fb.group({
      icon: [null, TValidators.required],
      name: [null, TValidators.required],
      description: [null, TValidators.required]
    });
  }

  ngOnInit() {
  }

  teacher = (params: any) => {
    return this.teacherApiService.getList(params).pipe(map(res => res.items.map(x => {
      return { value: x.id, label: x.fullName };
    })));
  }

}
