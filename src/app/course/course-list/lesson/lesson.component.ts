import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnitsApiService } from '@shared/api/units.api.service';
import { UnitAndTest } from 'types/enums';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  unitType: UnitAndTest;
  unitId: string;
  UnitAndTest = UnitAndTest;
  unit: any;
  constructor(
    private route: ActivatedRoute,
    private unitApi: UnitsApiService,

  ) { }

  ngOnInit(): void {
    this.unitType = this.route.snapshot.paramMap.get('unitType') as UnitAndTest;
    this.unitId = this.route.snapshot.paramMap.get('unitId');
    if (this.unitType === UnitAndTest.Unit) {
      this.unitApi.getUnit(this.unitId).subscribe(res => {
        this.unit = res;
      });
    }
  }
}
