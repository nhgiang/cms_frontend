import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Host, Input, OnInit, Optional } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzCollapseComponent, NzCollapsePanelComponent } from 'ng-zorro-antd/collapse';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { Step } from 'types/models/course';

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
  @Input() data: Step;
  @Input() nzActive = false;
  @Input() nzDisabled = false;
  constructor(
    public nzConfigService: NzConfigService,
    cdr: ChangeDetectorRef,
    @Host() nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(nzConfigService, cdr, nzCollapseComponent, elementRef, noAnimation);
  }

  ngOnInit(): void {
  }

  editStep(e) {
    e.stopPropagation();
    // this.data.
  }

  deleteStep(e) {
    e.stopPropagation();
  }
}
