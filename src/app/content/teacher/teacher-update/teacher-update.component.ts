import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SettingTeacherItem } from 'types/typemodel';
import { ContentStateService } from '../../content-state.service';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.scss']
})
export class TeacherUpdateComponent implements OnInit {
  index: number;
  teacher: SettingTeacherItem;
  constructor(private contentState: ContentStateService) { }

  ngOnInit(): void {
    // this.contentState.setttingTeacher$.pipe(map(res => res.teachers.filter(a => a))).subscribe( => );
  }

}
