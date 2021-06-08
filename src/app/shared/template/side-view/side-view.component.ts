import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeConstantService } from '@shared/services/theme-constant.service';
@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss'],
})
export class SideViewComponent implements OnInit {
  pwChangeForm: FormGroup;
  isActivated = false;
  constructor(
    private themeService: ThemeConstantService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.themeService.sideViewToggles.subscribe(
      (isActivated) => (this.isActivated = isActivated)
    );
    this.pwChangeForm = this.fb.group({
      oldPw: [''],
      newPw: [''],
      confirmPw: [''],
    });
  }
  closeSideView() {
    this.themeService.toggleSideView(false);
  }
}
