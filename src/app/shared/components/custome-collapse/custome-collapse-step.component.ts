import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, OnInit, Optional, Output } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { LessonApiService } from '@shared/api/lesson.api.service';
import { Lesson } from 'types/models/course';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitsApiService } from '@shared/api/units.api.service';
import { UnitAndTest } from 'types/enums';
import { UnitTestApiService } from '@shared/api/unit-test.api.service';

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
  @Input() isDisable: boolean;
  @Output() refresh = new EventEmitter();
  isEdit: boolean;
  UnitAndTest = UnitAndTest;
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
    private unitTestApi: UnitTestApiService,
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
      this.notification.success('Th??nh c??ng', 'X??a th??ng tin ch????ng h???c th??nh c??ng!');
    }, _ => {
      this.notification.error('Th???t b???i', 'Kh??ng th??? x??a ch????ng h???c ???? t???n t???i b??i h???c!');
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
      this.notification.success('Th??nh c??ng', 'C???p nh???t th??ng tin ch????ng h???c th??nh c??ng');
      this.isEdit = false;
      this.markForCheck();
    }, err => {
      this.notification.error('Th???t b???i', 'T??n ch????ng b??? tr??ng trong h??? th???ng kho?? h???c!');
    });
  }

  editUnit(id, unitType) {
    this.router.navigate([`lesson/${this.data.id}/unit/${id}/${unitType}`], { relativeTo: this.route });
  }

  deleteUnit(id, unitType) {
    if (unitType === UnitAndTest.Unit) {
      this.unitApi.deleteUnit(id).subscribe(() => {
        this.refresh.emit();
        this.notification.success('Th??nh c??ng', 'X??a th??ng tin b??i h???c th??nh c??ng!');
      });
    }
    if (unitType === UnitAndTest.Test) {
      this.unitTestApi.delete(id).subscribe(() => {
        this.refresh.emit();
        this.notification.success('Th??nh c??ng', 'X??a th??ng tin b??i h???c th??nh c??ng!');
      });
    }
  }
}
