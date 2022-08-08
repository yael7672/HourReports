import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-massge-to-user-with-edit',
  templateUrl: './massge-to-user-with-edit.component.html',
  styleUrls: ['./massge-to-user-with-edit.component.css']
})
export class MassgeToUserWithEditComponent implements OnInit {
  @Input() massgeUserHeader: any
  @Input() massgeUserBody2: any
  @Input() massgeUserBody1: any
  @Input() kindOfMassage: any;
  @Input() inputValue: any;
  @Input() ifButton: any;
  @Input() Time! : any;
  @Output() clickYes = new EventEmitter<any>();
  @Output() clickNo = new EventEmitter<any>();
  @Output() clickEdit = new EventEmitter<any>();
  @Output() clickCancel = new EventEmitter<any>();
  WorkTimePause: any;


  
  constructor() { 
    this.WorkTimePause=localStorage.getItem("WorkTimePause") 
  }

  ngOnInit(): void {
  }
  BtnYes() {
    if (this.kindOfMassage == 'EditPauseHour') {
      this.clickYes.emit('kindOfMassageEditPauseHour')
    }
  }
  BtnNo() {
    if (this.kindOfMassage == 'EditPauseHour') {
      this.clickNo.emit('kindOfMassageEditPauseHour')
    }
  }
  BtnEdit(ActualTime:any) {
    if (this.kindOfMassage == 'EditPauseHour') {
      this.clickEdit.emit(ActualTime)
    }
  }
  BtnCancel(ActualTime:any) {
    if (this.kindOfMassage == 'EditPauseHour') {
      this.clickCancel.emit(ActualTime)
    }
  }
}
