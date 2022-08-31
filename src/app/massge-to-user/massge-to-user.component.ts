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
  @Input() ifButton: any;
  @Input() ButtonCancel!:boolean
  @Output() clickYes = new EventEmitter<any>();
  @Output() clickNo = new EventEmitter<any>();
  @Output() clickCancel = new EventEmitter<any>();

  constructor() {
 
   }

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
            else {
              if (this.kindOfMassage == 'projectContectItemByTimer') {
                this.clickYes.emit('projectContectItemByTimer')
              }
              else {
                if (this.kindOfMassage == 'checkIfIsReportOnThisDate') {
                  this.clickYes.emit('checkIfIsReportOnThisDate')

                }
                else {
                  if (this.kindOfMassage == 'deleteProjectContentItem') {
                    this.clickYes.emit('deleteProjectContentItem')
                  }
                  else{
                    if (this.kindOfMassage == 'cancelPause') {
                      this.clickYes.emit('cancelPause')
                    }
                  }
                }
              }
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
            else {

              if (this.kindOfMassage == 'projectContectItemByTimer') {
                this.clickNo.emit('projectContectItemByTimer')
              }
              else {
                if (this.kindOfMassage == 'checkIfIsReportOnThisDate') {
                  this.clickNo.emit('checkIfIsReportOnThisDate')
                }
                else {
                  if (this.kindOfMassage == 'deleteProjectContentItem') {
                    this.clickNo.emit('deleteProjectContentItem')
                  }
                  else{
                    if (this.kindOfMassage == 'cancelPause') {
                      this.clickNo.emit('cancelPause')
                    }
                  }
                }
              }
            }

          }
        }
      }
  }
  BtnCancel(){
    if (this.kindOfMassage == 'projectContectItemByTimer') {
      this.clickCancel.emit('projectContectItemByTimer')
    }
  }
}
