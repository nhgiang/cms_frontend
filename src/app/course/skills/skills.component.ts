import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsApiService } from '@shared/api/skills.api.service';
import { DataTableContainer } from '@shared/class/data-table-container';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
    router: Router,
    private notificationService: NzNotificationService
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

  createSkill() {
    this.modalService.create({
      nzContent: SkillsModalComponent,
      nzTitle: 'Thêm kỹ năng đạt được',
      nzComponentParams: {
        type: 'create',
        api: (data: ICourseSkills) => this.skillsApiService.create(data)
      }
    }).afterClose.subscribe(submit => {
      if (submit) { this.refresh(); }
    });
  }

  editSkill(item: ICourseSkills) {
    this.modalService.create({
      nzContent: SkillsModalComponent,
      nzTitle: 'Sửa kỹ năng đạt được',
      nzComponentParams: {
        type: 'edit',
        data: item,
        api: (data: ICourseSkills) => this.skillsApiService.update(item.id, data)
      }
    }).afterClose.subscribe(submit => {
      if (submit) { this.refresh(); }
    });
  }

  deleteSkill(id: string) {
    this.skillsApiService.delete(id).subscribe(
      () => {
        this.notificationService.success('Thành công', '');
        this.refreshTrigger.next();
      });
  }
}
