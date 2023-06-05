import { Injectable, EventEmitter } from '@angular/core'
import { LearningState } from 'types/models'

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  _closed = new EventEmitter()
  _open = new EventEmitter()
  isOpen = new EventEmitter()
  constructor() { }

  open(panelComponent, panelName, learningState?: LearningState, isHideHeader?: boolean) {
    this._open.emit({
      panelComponent,
      learningState: learningState,
      panelName,
      isHideHeader
    })
  }

  close() {
    this.isOpen.emit(false)
    setTimeout(() => {
      this._closed.emit()
    }, 330)
  }
}
