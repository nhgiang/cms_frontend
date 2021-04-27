import { Component, Input, OnInit, Optional } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { Step } from 'types/models/course';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {
  @Input() steps: Step[];
  constructor() { }

  ngOnInit(): void {
  }

}
