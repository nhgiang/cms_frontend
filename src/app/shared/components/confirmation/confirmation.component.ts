import { Component, Input, EventEmitter, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { Output } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[confirmation], confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})


export class ConfirmationComponent {
  @Input() confirmation: string;
  @Input() confirmLabel: string;
  @Input() title: string;
  @Input() set confirmationType(value: 'info' | 'warning' | 'danger') {
    this.type = value;
  }
  @Input() time: number;
  @Output() confirmed = new EventEmitter();
  @Output() dismissed = new EventEmitter();
  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  @ViewChild('footer', { static: true }) footer: TemplateRef<any>;


  type: 'info' | 'warning' | 'danger' = 'danger';
  modalRef: NzModalRef;

  constructor(
    private modalService: NzModalService
  ) { }

  hide() {
    this.modalRef.close();
    this.dismissed.emit();
  }

  confirm() {
    this.confirmed.emit();
    this.hide();
  }

  @HostListener('click')
  onclick() {
    this.modalRef = this.modalService.create( {
      nzContent: this.template,
      nzFooter: this.footer,
      nzClassName: 'ant-modal-confirm',
    });
    if (this.time > 0) {
      setTimeout(() => {
        this.hide();
      }, this.time * 1000);
    }
  }
}
