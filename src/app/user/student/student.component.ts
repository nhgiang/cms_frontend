import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentApiService } from '@shared/api/student.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import { debounceTime } from 'rxjs/operators';
import { UserStatus } from 'types/enums';
import { User } from 'types/typemodel';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends DataTableContainer<User> implements OnInit {
  form: FormGroup;
  studentStatusOptions = StudentStatusOptions;
  UserStatus = UserStatus;
  partners: any[];
  constructor(
    private studentApi: StudentApiService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.buildform();
    super.ngOnInit();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((res) => this.onSearchParamsChanged(res))
  }

  protected fetch() {
    const params = {
      limit: this.quantity,
      page: this.page,
    };
    const { specializationId, q, status } = this.params;
    return this.studentApi.getAll({ ...params, specializationId, q, status })
  }

  buildform() {
    this.form = this.fb.group({
      q: [null],
      status: [null]
    });
  }
}
