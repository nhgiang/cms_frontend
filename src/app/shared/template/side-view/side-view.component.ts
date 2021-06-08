import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
})
export class SideViewComponent implements OnInit {
  pwChangeForm: FormGroup;
  constructor() {}

  ngOnInit() {}
}
