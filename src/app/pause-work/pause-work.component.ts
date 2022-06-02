import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-pause-work',
  templateUrl: './pause-work.component.html',
  styleUrls: ['./pause-work.component.css']
})
export class PauseWorkComponent implements OnInit {
  massgeUserCloseWorkPause1="האם אתה בטוח שברצונך לסיים הפסקה"
  todayDate!: any;
  myDate = new Date()
  pauseAlert: any
  systemGuid: any
  @Input() workTime!: any;
  @Output() ClickStartPause = new EventEmitter<any>();

  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  endButton!: boolean
  showMassgeToUser!: boolean
  formWorkPause!:NgForm
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService,
    private appService:AppService ,private popUpService :PopUpServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
  }

  ngOnInit(): void {

  }
BeforePauseWork(){
  this.showMassgeToUser=true

}

  PauseWork(form: any) {
    this.showMassgeToUser=true
    this.systemGuid = localStorage.getItem("systemGuid")
    this.userServiceService.PauseWork(this.systemGuid, form.ActualTime).subscribe(
      (res: any) => {
        this.pauseAlert = res;
        console.log(this.pauseAlert)
        alert(this.pauseAlert);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err: any) =>
        alert("error")
    )
  }
  startPause() {
    this.endButton = true
    this.ClickStartPause.emit()
    
  }
  OpenPopUpIfCloseTask(form:NgForm){
    this.showMassgeToUser=true
    this.formWorkPause = form.value

  }

  clickYes() { 
    alert("yes")
    console.log(this.formWorkPause);
    this.PauseWork(this.formWorkPause)
   


  }
  clickNo() {
    alert("no")
    this.showMassgeToUser=false
  }
}
