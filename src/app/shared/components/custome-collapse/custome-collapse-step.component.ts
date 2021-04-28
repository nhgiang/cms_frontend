import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Lesson } from 'types/models/course';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';

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

  deleteStep(e) {
    e.stopPropagation();
    this.lessonApi.deleteLesson(this.data.id).subscribe(() => {
      this.refresh.emit();
      this.notification.success('Thành công', 'Xóa thông tin chương học thành công!')
    });
  }

  addUnit(e) {
    this.router.navigate([`/course-management/course/create/lesson/${this.data.id}/unit`], { relativeTo: this.route });
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
    });
  }

  editUnit(e) {
    this.router.navigate(['']);
  }

  deleteUnit(e) {
    e.stopPropagation();
  }
}
