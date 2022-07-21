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
  pauseGuid: any
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
  pauseGuidForLoclStorage: any;
  creatOnProjectContentItem!: string;
  Time: any;
  ifInTheMiddleOfABreak = "false";
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService, public router: Router,
    private appService: AppService, private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
  }
  ngOnInit(): void {
    if (localStorage.getItem("endButton") == "true") { this.endButton = true }
    if (localStorage.getItem("endButton") == "false") { this.endButton = false }
    if ((localStorage.getItem("WorkTimePause"))) {
      this.ifX = false;

    console.log(this.workTimeHour);

      this.ContinueToBePause()
    }
  }
  BeforePauseWork() {
    this.showMassgeToUser = true
  }
  PauseWork(workTime: any) {
    this.workTimeHour = "00,00,00"
    localStorage.setItem("WorkTimePause", this.workTimeHour)
    localStorage.removeItem("WorkTimePause")

    this.systemGuid = localStorage.getItem("systemGuid")
    this.taskGuid = localStorage.getItem("TaskGuid")
    this.userServiceService.PauseWork(this.systemGuid, workTime).then(
      (res: any) => {
        this.pauseGuid = res;
        console.log(this.pauseGuid)
        swal(this.pauseGuid);
        this.endButton = false

        clearInterval(this.interval)
        this.workTime=["00:00:00"];
        let latest_date = this.datePipe.transform(workTime, 'HH:mm:ss');
        console.log(latest_date);
        this.workTimeHour = latest_date;
        localStorage.setItem('WorkTimePause', this.workTimeHour)
        localStorage.removeItem("WorkTimePause")

        localStorage.setItem("endButton", String(this.endButton))
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        if (this.taskGuid) {
          this.openSpecificTask = true
          setTimeout(() => {
            this.taskListDataDetails = localStorage.getItem("taskListDataDetails")
            let myCompMenu = new MenuComponent(this.router, this.popUpService, this.userServiceService, this.appService, this.buttonWorkingTaskService, this.datePipe)
            myCompMenu.SelectedTask(this.taskListDataDetails)
          }, 500)
        }
      },
      (err: any) =>
        alert("error")
    )
  }
  SelectedStartPause() {
    this.interval = setInterval(() => {
      this.GetProjectContentItemByGuid()
    }, 1000)
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
      }
    })
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
      this.timetoSend = time.split(':')
      clearInterval(this.interval);
      // this.seconds = 0;
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
      // localStorage.removeItem("WorkTimePause")
      this.PauseWork(this.parseTime)
    }
  }
  clickNo() {
    this.showMassgeToUser = false;
    this.ifX = false;
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

    if (localStorage.getItem("WorkTimePause")) {
      this.interval = setInterval(() => {
        this.GetProjectContentItemByGuid()
      }, 1000)
    }

  }
  // }
}
