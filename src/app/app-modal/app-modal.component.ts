import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements AfterViewInit, OnDestroy {
  @Input() class = '';

  @Output() pleaseClose = new EventEmitter<string>();

  @Output() modalInstance = new EventEmitter<NgbModalRef>();

  @ViewChild('content') content: any;

  readonly CLOSE_REASON = 'Close';

  modal!: NgbModalRef;

  constructor(private modalService: NgbModal, config: NgbModalConfig ) {
    config.backdrop = 'static';
    config.centered = true;
  }

  ngAfterViewInit(): void {
    const params: any = { ariaLabelledBy: 'modal-basic-title' };
    if (this.class) params.windowClass = this.class;
    this.modal = this.modalService.open(this.content, params);
    this.modalInstance.emit(this.modal);
    this.modal.result.then((result: string | undefined) => {
      this.closeModal(result);
    }, (result: any) => {
      const closeReasons = [ModalDismissReasons.ESC, ModalDismissReasons.BACKDROP_CLICK ];
      this.closeModal(closeReasons.includes(result) ? this.CLOSE_REASON : result);
    });
  }

  ngOnDestroy() {
    if (this.modal) this.modal.close();
  }

  onButton(result: any) {
    this.modal.close(result);
  }

  closeModal(reason: string | undefined) {
    this.pleaseClose.emit(reason);
  }
}
