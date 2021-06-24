import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseApiService } from '@shared/api/course.api.service';
import { InvoiceApiService } from '@shared/api/invoice.api.service';
import { PaymentsApiService } from '@shared/api/payments.api.service';
import {
  SettingMemberships,
  SettingMembershipsApiService,
} from '@shared/api/setting-memberships.api.service';
import { StudentApiService } from '@shared/api/student.api.service';
import { Ultilities } from '@shared/extentions/Ultilities';
import { TValidators } from '@shared/extentions/validators';
import { StudentStatusOptions } from '@shared/options/student-status.options';
import { omitBy } from 'lodash-es';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime, finalize, map, tap } from 'rxjs/operators';
import {
  InvoiceStatus,
  InvoiceStatusOptions,
  InvoiceType,
  PaymentMethod,
  UserStatus,
} from 'types/enums';
import { Course } from 'types/models/course';
import { User } from 'types/typemodel';

const MembershipId = 'Membership';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
})
export class OrderCreateComponent implements OnInit {
  form: FormGroup;
  search: FormControl = new FormControl('');
  objCourse: { [key: string]: Course } = {};
  listBank: any = [];
  membershipInfo: SettingMemberships;
  objKey: { [key: string]: User } = {};
  StudentStatusOptions = StudentStatusOptions;
  invoiceStatusOptions = InvoiceStatusOptions;
  invoiceStatus = InvoiceStatus;
  invoiceType = InvoiceType;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private invoiceApi: InvoiceApiService,
    private nzNotification: NzNotificationService,
    private studentApi: StudentApiService,
    private router: Router,
    private courseService: CourseApiService,
    private settingMembershipService: SettingMembershipsApiService,
    private paymentService: PaymentsApiService
  ) {}

  async ngOnInit() {
    this.buildForm();

    this.settingMembershipService.get().subscribe((res) => {
      this.membershipInfo = res as any;
      this.objCourse[MembershipId] = {
        id: MembershipId,
        name: 'Gói Membership',
        studentPrice: this.membershipInfo.price,
      } as Course;
    });

    this.paymentService.getList().subscribe((res) => {
      this.listBank = res;
    });

    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.onSearchCourses(value);
    });

    this.form.get('status').valueChanges.subscribe((val) => {
      if (val !== this.invoiceStatus.Success) {
        // tslint:disable-next-line: forin
        for (const key in this.form.controls) {
          this.form.controls[key].setErrors(null);
          this.setValidatorsWhenStatusNotSuccess();
        }
        return;
      }
      this.setValidatorsWhenStatusSuccess();
    });

    this.form.get('userId').valueChanges.subscribe((userId) => {
      if (
        this.objKey[userId]?.status &&
        this.objKey[userId].status === UserStatus.InActive
      ) {
        this.form.get('userId').setErrors({
          incorrect: true,
        });
      }
    });
  }

  user$ = (params: any) => {
    return this.studentApi.getAll(params).pipe(
      tap((res) =>
        res.items.forEach((student) => (this.objKey[student.id] = student))
      ),
      // tslint:disable-next-line: max-line-length
      map((res) => {
        return res.items.map((x) => ({
          value: x.id,
          label: x.fullName || x.email,
        }));
      })
    );
  };

  addCourse(courseId: any) {
    if (!courseId) {
      return;
    }

    const course = this.objCourse[courseId];

    if (!course) {
      return;
    }

    this.search.reset({});
    if (course.id === MembershipId) {
      this.search.disable();
      this.form.patchValue({
        type: InvoiceType.Membership,
        items: [course.id],
      });
      return;
    }

    this.form.patchValue({
      type: InvoiceType.Course,
      items: [...this.form.value.items, course.id],
    });
  }

  removeCourse(removedId: string) {
    if (this.form.value.type === InvoiceType.Membership) {
      this.form.patchValue({
        type: InvoiceType.Course,
        items: [],
      });
      return this.search.enable();
    }

    this.form.patchValue({
      items: this.form.value.items.filter((id) => id !== removedId),
    });
  }

  onSearchCourses = (params: any) =>
    this.courseService.getList(params).pipe(
      tap((res) => res.items.forEach((c) => (this.objCourse[c.id] = c))),
      map((res) => {
        return [
          { value: MembershipId, label: 'Gói Membership' },
          ...res.items.map((x) => ({
            value: x.id,
            label: x.name,
          })),
        ];
      })
    );

  calcTotalPrice() {
    return this.form.value.items.reduce(
      (sum, courseId) => sum + this.objCourse[courseId].studentPrice,
      0
    );
  }

  submit() {
    Ultilities.validateForm(this.form);
    this.isLoading = true;
    this.invoiceApi
      .manualCreate({
        ...omitBy(this.form.getRawValue(), 'code'),
        items:
          this.form.value.type === this.invoiceType.Membership
            ? []
            : this.form.value.items,
        paymentMethod: PaymentMethod.Bank,
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.nzNotification.success('Thành công', 'Tạo đơn hàng thành công!');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }

  setValidatorsWhenStatusNotSuccess() {
    this.form.setValidators([]);
    this.form.get('bankCode').setValidators([]);
    this.form.get('transactionCode').setValidators([]);
    this.form.get('transactionTime').setValidators([]);
    this.form.get('transactionAmount').setValidators([]);
  }

  setValidatorsWhenStatusSuccess() {
    this.form.get('bankCode').setValidators([TValidators.required]);
    this.form.get('transactionCode').setValidators([Validators.required]);
    this.form.get('transactionTime').setValidators([Validators.required]);
    this.form
      .get('transactionAmount')
      .setValidators([
        Validators.required,
        TValidators.maxLength(10),
        TValidators.onlyNumber(),
      ]);
  }

  buildForm() {
    this.form = this.fb.group({
      code: this.fb.control({ value: null, disabled: true }),
      type: [InvoiceType.Course, Validators.required],
      bankCode: [null],
      transactionCode: [null],
      transactionTime: [null],
      transactionAmount: [null],
      status: [InvoiceStatus.Success, Validators.required],
      note: [null],
      userId: [null, Validators.required],
      items: [[]],
    });

    this.setValidatorsWhenStatusSuccess();
  }
}
