import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert';
import { MenuComponent } from '../menu/menu.component';
import { ButtonWorkingTaskService } from '../button-working-task.service';


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
  @Output() ClickStartPause = new EventEmitter<any>();
  workTimeHour: any
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
  workTimeLS: any;
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService,
    private appService: AppService, private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
  }

  ngOnInit(): void {
    localStorage.setItem("endButtonPause",String(this.endButton))
  }

  BeforePauseWork() {
    this.showMassgeToUser = true
  }

  PauseWork(workTime: any) {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.taskGuid = localStorage.getItem("TaskGuid")
    this.userServiceService.PauseWork(this.systemGuid, workTime).subscribe(
      (res: any) => {
        this.pauseAlert = res;
        console.log(this.pauseAlert)
        swal(this.pauseAlert);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        if (this.taskGuid) {
          // if (this.ifInMiddleTask == true) {
            this.openSpecificTask = true
            setTimeout(() => {
              this.taskListDataDetails = localStorage.getItem("taskListDataDetails")
              let myCompMenu = new MenuComponent(this.popUpService, this.userServiceService, this.appService, this.buttonWorkingTaskService)
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
   this.workTimeLS = localStorage.getItem('workTime');

    if(this.workTimeLS)
    {
      this.workTimeHour = this.workTimeLS
    }
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
      // localStorage.setItem('workTime', this.workTimeHour)
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
    localStorage.setItem("endButtonPause",String(this.endButton))
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
}
