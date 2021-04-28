import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Lesson } from 'types/models/course';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  @Input() activities: any[];
  @Output() refresh = new EventEmitter();
  isEdit: boolean;
  constructor(
    public nzConfigService: NzConfigService,
    cdr: ChangeDetectorRef,
    @Host() nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    private lessonApi: LessonApiService,
    private notification: NzNotificationService,
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
      this.notification.success('Thành công', 'Xóa chương học thành công!')
    });
  }

  addActivity(e) {
    e.stopPropagation();
    this.activities.push({});
  }
}
