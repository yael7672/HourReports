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
  massgeUserCloseWorkPause1 = "?האם אתה בטוח שברצונך לסיים הפסקה"
  todayDate!: any;
  myDate = new Date()
  pauseGuid: any
  systemGuid: any
  @Input() workTime!: any;
  @Input() buttonEnd!: any;

  @Output() ClickStartPause = new EventEmitter<any>();
  workTimeHour!: any
  descriptionPanel: any;
  interval: any;
  endButton!: boolean
  timetoSend: any;
  parseTime: any;
  showMassgeToUser!: boolean
  formWorkPause!: NgForm
  ifX = true;
  taskGuid: any;
  ifInMiddleTask = false
  openSpecificTask = false
  taskListDataDetails: any
  popUpPause = "popUpPause"
  workTimeLS!: any;
  workTimeHourLS!: any;
  workTime1: any;
  pauseGuidForLoclStorage: any;
  creatOnProjectContentItem!: string;
  Time: any;
  ifInTheMiddleOfABreak = "false";
  pauseForLoclStorage:any
  constructor( private elementRef: ElementRef,private datePipe: DatePipe, private userServiceService: UserServiceService, public router: Router,
    private appService: AppService, private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);

  }

  ngOnInit(): void {
    if (localStorage.getItem("endButton") == "true") { this.endButton = true }
    if (localStorage.getItem("endButton") == "false") { this.endButton = false }
    console.log(this.workTimeHour);
      //this.ifX = false
      // this.ContinueToBePause()
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
    this.userServiceService.PauseWork(this.systemGuid, workTime).then(
      (res: any) => {
        this.pauseGuid = res;
        console.log(this.pauseGuid)
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
            let myCompMenu = new MenuComponent(this.router, this.popUpService, this.userServiceService,this.elementRef, this.appService, this.buttonWorkingTaskService, this.datePipe)
            myCompMenu.SelectedTask(this.taskListDataDetails)
          }, 500)
        }
        // }
      },
      (err: any) =>
        alert("error")
    )
  }

  GetProjectContentItemByGuid() {
    this.ifInTheMiddleOfABreak = "true";
    localStorage.setItem('ifInTheMiddleOfABreak', this.ifInTheMiddleOfABreak)
    this.pauseGuidForLoclStorage = localStorage.getItem('pauseGuid')
    this.userServiceService.GetProjectContentItemByGuid(this.pauseGuidForLoclStorage).subscribe(res => {
      if (res) {
        this.creatOnProjectContentItem = res.CreatedOn;
        console.log(this.creatOnProjectContentItem);
        const timestampCreatOn = new Date(this.creatOnProjectContentItem)
        const timestampNow = (new Date(Date.now()))
        this.Time = timestampNow.getTime() - timestampCreatOn.getTime();
        let latest_date = this.datePipe.transform(this.Time, 'HH:mm:ss');
        console.log(latest_date);
        this.workTimeHour = latest_date;
        localStorage.setItem('WorkTimePause', this.workTimeHour)
        //  alert(latest_date)
      }
    })
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
    this.showMassgeToUser = true;
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
    this.PauseWork(this.parseTime)
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
  console.log(timestampNow);
  console.log(timestampCreatOn);
  this.Time = timestampNow - timestampCreatOn;
  return this.datePipe.transform(this.Time, 'HH:mm:ss',"+0000");

}
setWorkTime(res: any) {
  this.workTimeHour = this.convertTimeStempToTime(res)
  console.log(this.workTimeHour);
}
}
