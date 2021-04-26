import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecializationApiService } from '@shared/api/specialization.api.service';
import { Ultilities } from '@shared/extentions/ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-specializations-edit',
  templateUrl: './specializations-edit.component.html',
  styleUrls: ['./specializations-edit.component.scss']
})
export class SpecializationsEditComponent implements OnInit {
  @Input() id: string;
  @Output() edited = new EventEmitter();
  form: FormGroup;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private specialiationApi: SpecializationApiService,
    private modalRef: NzModalRef,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.specialiationApi.getById(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required]
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    const data = {
      name: this.form.value.name.trim(),
      id: this.id
    };
    this.isLoading = true;
    this.specialiationApi.update(this.id, data).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.modalRef.close();
      this.notification.success('Thành công', 'Cập nhật chuyên môn giảng viên thành công');
      this.edited.emit();
    });
  }
}
