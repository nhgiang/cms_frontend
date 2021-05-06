import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Lesson } from 'types/models/course';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UnitsApiService } from '@shared/api/units.api.service';

@Component({
  selector: 'app-custome-collapse-step',
  templateUrl: './custome-collapse-step.component.html',
  styleUrls: ['./custome-collapse-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [collapseMotion],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.ant-collapse-item-active]': 'nzActive',
    '[class.ant-collapse-item-disabled]': 'nzDisabled'
  }
})
export class CustomeCollapseStepComponent extends NzCollapsePanelComponent implements OnInit {
  @Input() data: Lesson;
  @Output() refresh = new EventEmitter();
  isEdit: boolean;
  constructor(
    public nzConfigService: NzConfigService,
    cdr: ChangeDetectorRef,
    @Host() nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    private lessonApi: LessonApiService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private unitApi: UnitsApiService,
    @Optional() public noAnimation?: NzNoAnimationDirective,
  ) {
    super(nzConfigService, cdr, nzCollapseComponent, elementRef, noAnimation);
  }

  ngOnInit(): void {
  }

  editStep(e) {
    e.stopPropagation();
    this.isEdit = !this.isEdit;
  }

  deleteStep() {
    this.lessonApi.deleteLesson(this.data.id).subscribe(() => {
      this.refresh.emit();
      this.notification.success('Thành công', 'Xóa thông tin chương học thành công!')
    }, err => {
      this.notification.error('Thất bại', 'Không thể xóa chương học đã tồn tại bài học!')
    });
  }

  addUnit(e) {
    this.router.navigate([`lesson/${this.data.id}/unit`], { relativeTo: this.route });
  }

  editLesson(e) {
    e.stopPropagation();
    if (!this.isEdit) {
      this.isEdit = true;
      return;
    }
    this.lessonApi.editLesson(this.data.id, this.data).subscribe(() => {
      this.notification.success('Thành công', 'Cập nhật thông tin chương học thành công');
      this.isEdit = false;
      this.markForCheck();
    }, err => {
      this.notification.error('Thất bại', 'Tên chương bị trùng trong hệ thống khoá học!');
    });
  }

  editUnit(id, unitType) {
    this.router.navigate([`lesson/${this.data.id}/unit/${id}/${unitType}`], { relativeTo: this.route });
  }

  deleteUnit(id) {
    this.unitApi.deleteUnit(id).subscribe(() => {
      this.refresh.emit();
      this.notification.success('Thành công', 'Xóa thông tin bài giảng thành công!');
    });
  }
}
