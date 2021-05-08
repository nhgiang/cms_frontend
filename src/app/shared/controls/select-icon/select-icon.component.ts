import { Component, OnInit } from '@angular/core';
import { DestroyService } from '@shared/services/destroy.service';
import { SelectAdvanceComponent } from '../select-advance/select-advance.component';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss'],
  providers: [DestroyService]
})
export class SelectIconComponent extends SelectAdvanceComponent implements OnInit {

  select: string;

}
