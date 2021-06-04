import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApiService } from '@shared/api/contact.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs/operators';
import { ContactStatus } from 'types/enums';
import { trimData } from 'utils/common';

@Component({
  selector: 'app-consulting-information-edit',
  templateUrl: './consulting-information-edit.component.html',
  styleUrls: ['./consulting-information-edit.component.scss']
})
export class ConsultingInformationEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  ContactStatus = ContactStatus;
  isLoading: boolean;
  constructor(
    private fb: FormBuilder,
    private contactApi: ContactApiService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.buildForm();
    this.contactApi.getById(this.id).subscribe((res) => {
      this.form.patchValue(res);
    });
  }

  submit() {
    Ultilities.validateForm(this.form);
    const data = { ...this.form.value };
    this.isLoading = true;
    this.contactApi.update(this.id, trimData(data)).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin tư vấn thành công!');
      this.router.navigate(['/consulting/information']);
    });
  }

  deleteItem() {
    this.isLoading = true;
    this.contactApi.delete(this.id).pipe(finalize(() => this.isLoading = false)).subscribe(() => {
      this.notification.success('Thành công', 'Xóa thông tin tư vấn thành công!');
      this.router.navigate(['/consulting/information']);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, TValidators.required],
      email: [null, [TValidators.required, TValidators.emailRules]],
      phoneNumber: [null, [TValidators.required, TValidators.phoneNumber]],
      courseInterested: [null, TValidators.required],
      note: [null],
      status: [null]
    });
  }
}
