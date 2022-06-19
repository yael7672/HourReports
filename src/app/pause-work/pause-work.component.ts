import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
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
  pauseAlert: any
  systemGuid: any
  @Input() workTime!: any;
  @Input() buttonEnd!: any;
  @Output() ClickStartPause = new EventEmitter<any>();
  workTimeHour!: any
  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
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
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService,public router:Router,
    private appService: AppService, private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);

  }

  ngOnInit(): void {
    if (localStorage.getItem("endButton") == "true") { this.endButton = true }
    if (localStorage.getItem("endButton") == "false") { this.endButton = false }
    this.workTimeHourLS = localStorage.getItem('WorkTimePause')
    this.workTimeHour = JSON.parse(this.workTimeHourLS);
    console.log(this.workTimeHour);

    let hours = Number(this.workTimeHour[0]) / 3600; // get hours
    let minutes = Number(this.workTimeHour[1]) - (hours * 3600) / 60; // get minutes
    let seconds = Number(this.workTimeHour[2]) + (hours * 3600) + (minutes * 60);
     if (this.workTimeHourLS != 0) {
      this.ContinueToBePause(seconds)
    }


  }

  BeforePauseWork() {
    this.showMassgeToUser = true
  }

  PauseWork(workTime: any) {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.taskGuid = localStorage.getItem("TaskGuid")
    this.userServiceService.PauseWork(this.systemGuid, workTime).then(
      (res: any) => {
        this.pauseAlert = res;
        console.log(this.pauseAlert)
        swal(this.pauseAlert);
        this.endButton = false  
         
         this.seconds = 0;
        this.workTime = ["00", "00", "00"];
        this.workTime[0] = "00"
        this.workTime[1] = "00"
        this.workTime[3] = "00"
        clearInterval( this.interval)
        localStorage.setItem("WorkTimePause", this.workTime)
        // localStorage.removeItem("WorkTimePause")
        localStorage.setItem("endButton", String(this.endButton))
  
        
        // localStorage.clear()
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        if (this.taskGuid) {
          // if (this.ifInMiddleTask == true) {
          this.openSpecificTask = true
          setTimeout(() => {
            this.taskListDataDetails = localStorage.getItem("taskListDataDetails")
            let myCompMenu = new MenuComponent(this.router,this.popUpService, this.userServiceService, this.appService, this.buttonWorkingTaskService, this.datePipe)
            myCompMenu.SelectedTask(this.taskListDataDetails)
          }, 500)
        }
        // }
      },
      (err: any) =>
        alert("error")
    )
  }


  SelectedStartPause() {

    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds++;
      }
      else {
        this.seconds++;
      }
      this.workTimeHour = this.transformNumber(this.seconds)
      if (this.workTimeHour[0] < 10) {
        this.workTimeHour[0] = "0" + this.workTimeHour[0]
      }
      if (this.workTimeHour[1] < 10) {
        this.workTimeHour[1] = "0" + this.workTimeHour[1]
      }
      if (this.workTimeHour[2] < 10) {
        this.workTimeHour[2] = "0" + this.workTimeHour[2]
      }
      localStorage.setItem("WorkTimePause", JSON.stringify(this.workTimeHour))
    }, 1000)
  }

  transformNumber(value: number) {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    return [hours, minutes, seconds]
  }

  startPause() {
    this.ifX = false;
    this.endButton = true;
    localStorage.setItem("endButton", String(this.endButton))
    this.CreatePauseWork();
    this.SelectedStartPause();
  }
  OpenPopUpIfCloseTask() {
    this.showMassgeToUser = true;
  }

  clickYes(time: any) {
    if (time != "") {
      this.timetoSend = [...time]
      clearInterval(this.interval);
      this.seconds = 0;
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = this.timetoSend[0] + this.timetoSend[1];

      this.PauseWork(this.parseTime)

    }
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
        this.pauseAlert = res;
      },
      (err: any) =>
        alert(err.error)
    )
  }
  ContinueToBePause(timeToContinue: any) {
    this.interval = setInterval(() => {
      if (timeToContinue === 0) {
        timeToContinue++;
      }
      else {
        timeToContinue++;
      }
      this.workTimeHour = this.transformNumber(timeToContinue)
      if (this.workTimeHour[0] < 10) {
        this.workTimeHour[0] = "0" + this.workTimeHour[0]
      }
      if (this.workTimeHour[1] < 10) {
        this.workTimeHour[1] = "0" + this.workTimeHour[1]
      }
      if (this.workTimeHour[2] < 10) {
        this.workTimeHour[2] = "0" + this.workTimeHour[2]
      }
      console.log(this.workTimeHour);
      localStorage.setItem('WorkTimePause', JSON.stringify(this.workTimeHour))

    }, 1000)

  }
}
