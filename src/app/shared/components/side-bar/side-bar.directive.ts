import { Directive, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ReflectiveInjector } from '@angular/core'
import { SideBarService } from '../../services/side-bar.service'
import { SideBarComponent } from './side-bar.component'

@Directive({
  selector: '[sideBar]'
})
export class SideBarDirective implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private sideBarService: SideBarService,
    private cfr: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.sideBarService._open.subscribe(data => {
      const container = this.renderContainer()
      container.instance.currentPanelName = data.panelName
      container.instance.isHideHeader = data.isHideHeader ? true : false
      const componentFactory = this.cfr.resolveComponentFactory(data.panelComponent)
      const component = container.instance.container.createComponent<any>(componentFactory)
      component.instance.learningState = data.learningState ?? data.learningState
    })
    this.sideBarService._closed.subscribe(() => {
      this.viewContainerRef.clear()
    })
  }

  renderContainer(): ComponentRef<SideBarComponent> {
    const containerFactory = this.cfr.resolveComponentFactory(SideBarComponent)
    return this.viewContainerRef.createComponent(containerFactory)
  }
}
