import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert';
import { MenuComponent } from '../menu/menu.component';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pause-work',
  templateUrl: './pause-work.component.html',
  styleUrls: ['./pause-work.component.css']
})
export class PauseWorkComponent implements OnInit {

  @Input() workTime!: any;
  @Input() buttonEnd!: any;
  @Output() ClickStartPause = new EventEmitter<any>()
  massgeUserCloseWorkPause1 = "?האם אתה בטוח שברצונך לסיים הפסקה"
  todayDate!: any;
  myDate = new Date();
  pauseGuid: any;
  systemGuid: any;
  workTimeHour!: any
  descriptionPanel: any;
  interval: any;
  endButton!: boolean;
  timetoSend: any;
  parseTime: any;
  showMassgeToUser!: boolean;
  showMassgeToUserEdit!:boolean;
  formWorkPause!: NgForm;
  ifX = true;
  taskGuid: any;
  ifInMiddleTask = false;
  openSpecificTask = false;
  taskListDataDetails: any;
  popUpPause = "popUpPause";
  workTimeLS!: any;
  workTimeHourLS!: any;
  workTime1: any;
  pauseGuidForLoclStorage: any;
  creatOnProjectContentItem!: string;
  Time: any;
  ifInTheMiddleOfABreak = "false";
  pauseForLoclStorage:any;
  massgeUserEditPauseHour1="עריכת שעות הפסקה";

  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService, public router: Router,
    private appService: AppService, private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    if (localStorage.getItem("endButton") == "true") { this.endButton = true }
    if (localStorage.getItem("endButton") == "false") { this.endButton = false }
      if (localStorage.getItem('DateNowPause')) {
        this.ContinueToBePause();
      }
  }

  BeforePauseWork() {
    this.showMassgeToUser = true
  }

  PauseWork(workTime: any) {
    localStorage.removeItem("WorkTimePause")
    this.systemGuid = localStorage.getItem("systemGuid")
    this.taskGuid = localStorage.getItem("TaskGuid")
    this.pauseGuidForLoclStorage = localStorage.getItem('pauseGuid')
    this.userServiceService.PauseWork(this.systemGuid,this.pauseGuidForLoclStorage ,workTime).then(
      (res: any) => {
        this.pauseGuid = res;
        swal(this.pauseGuid);
        clearInterval(this.interval)
        localStorage.removeItem("DateNowPause") 
        this.endButton = false
        localStorage.setItem("endButton", String(this.endButton))
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        if (this.taskGuid) {
          this.openSpecificTask = true
          setTimeout(() => {
            this.taskListDataDetails = localStorage.getItem("taskListDataDetails")
            let myCompMenu = new MenuComponent(this.router, this.popUpService, this.userServiceService, this.appService, this.buttonWorkingTaskService, this.datePipe)
            // myCompMenu.SelectedTask(this.taskListDataDetails)
          }, 500)
        }
      },
      (err: any) =>
        alert("error")
    )
  }
  startPause() {
    this.ifX = false;
    this.endButton = true;
    localStorage.setItem("endButton", String(this.endButton))
    this.CreatePauseWork();
    this.SelectedStartPause()
  }
    SelectedStartPause() {
    let a = Date.now()
    localStorage.setItem("DateNowPause", a.toString());
    this.continuePause();
  }
  OpenPopUpIfClosePause() {
    if(this.workTimeHour == 0 ||this.workTimeHour  < "00:01:00")
    {
        swal("אין אפשרות לדווח פחות מ-1 דק")
    }
    else{
        this.showMassgeToUser = true;
    }
  }

  clickYes(time: any) {
      if (time.worktime != "" || time != null) {
        this.timetoSend = time.worktime ? time.worktime.split(':') : time.split(':')
        clearInterval(this.interval);
        if (this.timetoSend[2] > 30) {
          this.timetoSend[1]++;
        }
        this.timetoSend[1] = (this.timetoSend[1] / 60)
        this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
        if (this.parseTime == undefined) {
          this.parseTime = "";
        }
    }
    this.endButton = false 
    this.showMassgeToUserEdit=true
    // this.PauseWork(this.parseTime)
  }
  clickNo() {
    this.showMassgeToUser = false
  }

  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
  }

  CreatePauseWork() {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.userServiceService.CreatePauseWork(this.systemGuid).subscribe(
      (res: any) => {
        this.pauseGuid = res;
        localStorage.setItem('pauseGuid', this.pauseGuid)
      },
      (err: any) =>
        alert(err.error)
    )
  }
  ContinueToBePause() {
    // if (localStorage.getItem("WorkTimePause")) {
      this.ifX=false
      this.getCreatedProjectContentItemFromLoaclStorage();
      this.interval = setInterval(() => {
        if (this.workTimeHour) {
          this.getCreatedProjectContentItemFromLoaclStorage();
        }
        else {
        }
      }, 1000)

}
continuePause(){
  this.getCreatedProjectContentItemFromLoaclStorage();
  this.interval = setInterval(() => {
    if (this.workTimeHour) {
      this.getCreatedProjectContentItemFromLoaclStorage();
    }
    else {
    }
  }, 1000)
}
getCreatedProjectContentItemFromLoaclStorage() {
  if (localStorage.getItem('DateNowPause')) {
    this.setWorkTime(localStorage.getItem('DateNowPause'))
  }
}
convertTimeStempToTime(ProjectContentItemCreatedDate: any) {
  var timestampCreatOn = ProjectContentItemCreatedDate;
  const timestampNow = Date.now();
  this.Time = timestampNow - timestampCreatOn;
  return this.datePipe.transform(this.Time, 'HH:mm:ss',"+0000");

}
setWorkTime(res: any) {
  this.workTimeHour = this.convertTimeStempToTime(res)
  localStorage.setItem('WorkTimePause', this.workTimeHour)
}
Edit(time:any){
     this.PauseWork(time)
}
clickCancel(){
  this.showMassgeToUserEdit = false
}
}
