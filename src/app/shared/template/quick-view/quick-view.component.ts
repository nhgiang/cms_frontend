import { Component, OnInit } from '@angular/core';
import { ThemeConstantService } from '@shared/services/theme-constant.service';

@Component({
    selector: 'app-quick-view',
    templateUrl: './quick-view.component.html'
})
export class QuickViewComponent implements OnInit{

    selectedHeaderColor: string;
    isSideNavDark: boolean;
    isFolded: boolean;

    constructor(private themeService: ThemeConstantService) { }

    ngOnInit(): void {
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        this.themeService.selectedHeaderColor.subscribe(color => this.selectedHeaderColor = color);
    }

    changeHeaderColor() {
        this.themeService.changeHeaderColor(this.selectedHeaderColor);
    }

    toggleSideNavDark() {
        this.themeService.toogleSideNavDark(this.isSideNavDark);
    }

    toggleFold() {
        this.themeService.toggleFold(this.isFolded);
    }
}

