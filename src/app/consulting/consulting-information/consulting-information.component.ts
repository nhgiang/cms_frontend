import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableContainer } from '@shared/class/data-table-container';
import { Observable, of } from 'rxjs';
import { ConsultingInformation, QueryResult } from 'types/typemodel';

@Component({
  selector: 'app-consulting-information',
  templateUrl: './consulting-information.component.html',
  styleUrls: ['./consulting-information.component.scss']
})
export class ConsultingInformationComponent extends DataTableContainer<ConsultingInformation> implements OnInit {

  search: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  protected fetch(): Observable<QueryResult<ConsultingInformation>> {
    return of(null);
  }

  deleteItems(id: string) {

  }

  buildForm() {
    this.search = this.fb.group({
      q: [null],
      status: [null]
    });
  }
}
