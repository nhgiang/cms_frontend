import { Component, Input, OnInit } from '@angular/core';
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
