import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-specializations-create',
  templateUrl: './specializations-create.component.html',
  styleUrls: ['./specializations-create.component.scss']
})
export class SpecializationsCreateComponent implements OnInit {
  form: FormGroup;
  isloading: boolean;
  @Output() created = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private specializationApi: SpecializationApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
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
    Ultilities.validateForm(this.form);
    this.isloading = true;
    this.specializationApi.create(this.form.value.name.trim()).pipe(finalize(() => this.isloading = false)).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Thêm mới thông tin chuyên môn thành công!');
      this.created.emit();
    });
  }
}
