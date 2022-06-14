import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-massge-to-user',
  templateUrl: './massge-to-user.component.html',
  styleUrls: ['./massge-to-user.component.css']
})
export class MassgeToUserComponent implements OnInit {
  @Input() massgeUserHeader: any
  @Input() massgeUserBody2: any
  @Input() massgeUserBody1: any
  @Input() kindOfMassage: any;
  @Output() clickYes = new EventEmitter<any>();
  @Output() clickNo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  BtnYes() {
    if (this.kindOfMassage == 'kindOfMassageIsifCloseTask') {
      this.clickYes.emit('kindOfMassageIsifCloseTask')
    }
    else {
      if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATask') {
        this.clickYes.emit('kindOfMassageifInTheMiddleOfWorkOnATask')
      }
    }
  }
  BtnNo() {
    if (this.kindOfMassage == 'kindOfMassageIsifCloseTask')
      this.clickNo.emit('kindOfMassageIsifCloseTask')
else
    if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATask') {
      this.clickNo.emit('kindOfMassageifInTheMiddleOfWorkOnATask')
    }
}
}
