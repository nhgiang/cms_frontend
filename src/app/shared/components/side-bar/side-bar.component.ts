import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core'
import { SideBarService } from '../../services/side-bar.service'

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef, static: true}) container: ViewContainerRef
  @Input() currentPanelName: string
  @Input() isHideHeader: boolean
  isOpen = false
  constructor(
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {this.isOpen = true}, 0)
    this.sideBarService.isOpen.subscribe(value => {
      this.isOpen = value
    })
  }

  hidePanel() {
    this.sideBarService.close()
  }
}
