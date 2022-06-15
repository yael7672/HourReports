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
  @Input() inputValue: any;
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
      else {
        if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause') {
          this.clickYes.emit('kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause')
        }
        else {
          if (this.kindOfMassage == 'popUpPause') {
            this.clickYes.emit('popUpPause')
          }
          else {
            if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite') {
              this.clickYes.emit('kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite')
            }
          }
        }
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
      else {
        if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause') {
          this.clickNo.emit('kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause')
        }
        else {
          if (this.kindOfMassage == 'popUpPause') {
            this.clickNo.emit('popUpPause')
          }
          else {
            if (this.kindOfMassage == 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite') {
              this.clickNo.emit('kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite')
            }
          }
        }
      }
  }


}
