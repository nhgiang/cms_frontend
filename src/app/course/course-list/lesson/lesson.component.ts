import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitsApiService } from '@shared/api/units.api.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private unitApi: UnitsApiService
  ) { }

  ngOnInit(): void {
  }
}
