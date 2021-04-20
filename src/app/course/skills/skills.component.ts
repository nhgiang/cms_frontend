import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ICourseSkills } from 'types/models/course-skills.model';
import { QueryResult } from 'types/typemodel';
import { SkillsModalComponent } from './skills-modal/skills-modal.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent extends DataTableContainer<ICourseSkills> implements OnInit {


  constructor(
    private skillsApiService: SkillsApiService,
    private modalService: NzModalService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(route, router);
  }


  fetch(): Observable<QueryResult<ICourseSkills>> {
    const params = {
      limit: this.quantity,
      page: this.page
    };
    return this.skillsApiService.findAll(params);
  }

  addItem() {
    const ref = this.modalService.create({
      nzContent: SkillsModalComponent,
      nzTitle: 'Thêm kỹ năng đạt được',
      nzComponentParams: {
        // type: 'create'
      }
    }).afterClose.subscribe(data => {
      if (data) {
        this.fetch();
      }
    });
  }

}
