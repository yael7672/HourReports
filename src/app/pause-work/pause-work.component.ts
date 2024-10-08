import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert';
import { MenuComponent } from '../menu/menu.component';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowMyTaskComponent } from '../tasks/show-my-task/show-my-task.component';


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
  showMassgeToUserCancelPause = false
  cancelPause = "cancelPause"
  ButtonCancel = true
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
  showMassgeToUserEdit!: boolean
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
  pauseForLoclStorage: any
  ifCancel = true
  massgeUserEditPauseHour1 = "עריכת שעות הפסקה"
  massageToUser: any;
  youAreInPause!: boolean
  timerPause : any
  constructor(private userService: UserServiceService, private elementRef: ElementRef,
    private datePipe: DatePipe, private userServiceService: UserServiceService,
    public router: Router, private appService: AppService,
    private popUpService: PopUpServiceService,
    private buttonWorkingTaskService: ButtonWorkingTaskService,
    private activatedRoute: ActivatedRoute) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.popUpService.getInPause().subscribe(res => {
      this.youAreInPause = res;
    })
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
    this.userServiceService.PauseWork(this.systemGuid, this.pauseGuidForLoclStorage, workTime).then(
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
            let showMyTaskComp = new ShowMyTaskComponent(this.activatedRoute, this.popUpService, this.appService, this.userServiceService, this.router)
            showMyTaskComp.SelectedTask(this.taskListDataDetails)
          }, 500)
        }
        // }
      },
      (err: any) =>
        alert(err.error)
    )
  }

  GetProjectContentItemByGuid() {
    this.ifInTheMiddleOfABreak = "true";
    localStorage.setItem('ifInTheMiddleOfABreak', this.ifInTheMiddleOfABreak)
    this.pauseGuidForLoclStorage = localStorage.getItem('pauseGuid')
    this.userServiceService.GetProjectContentItemByGuid(this.pauseGuidForLoclStorage).subscribe(res => {
      if (res) {
        this.creatOnProjectContentItem = res.CreatedOn;
        const timestampCreatOn = new Date(this.creatOnProjectContentItem)
        const timestampNow = (new Date(Date.now()))
        this.Time = timestampNow.getTime() - timestampCreatOn.getTime();
        let latest_date = this.datePipe.transform(this.Time, 'HH:mm:ss');
        this.workTimeHour = latest_date;
        localStorage.setItem('WorkTimePause', this.workTimeHour)
      }
    })
  }


  startPause() {
    this.popUpService.setInPause(true);
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
    if (this.workTimeHour == 0 || this.workTimeHour < "00:01:00") {
      swal("אין אפשרות לדווח פחות מ-1 דק")
    }
    else {
      this.showMassgeToUser = true;
    }

  }

  clickYes(time: any) {
    this.timerPause = time
    if (time != "" || time != null) {
      this.timetoSend = time ? time.split(':') : time.split(':')
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
      if (this.parseTime == undefined) {
        this.parseTime = "";
      }
      this.timerPause =  this.parseTime

    }
    this.popUpService.setInPause(false);

    this.endButton = false
    this.showMassgeToUserEdit = true

    // this.PauseWork(this.parseTime)
  }
  clickNo() {
    this.showMassgeToUserEdit = false
    this.showMassgeToUser = false
    this.endButton = true
    this.ContinueToBePause()

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
    this.ifX = false
    this.getCreatedProjectContentItemFromLoaclStorage();
    this.interval = setInterval(() => {
      if (this.workTimeHour) {
        this.getCreatedProjectContentItemFromLoaclStorage();
      }
      else {
      }
    }, 1000)

  }
  continuePause() {
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
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");

  }
  setWorkTime(res: any) {
    this.workTimeHour = this.convertTimeStempToTime(res)
    localStorage.setItem('WorkTimePause', this.workTimeHour)
  }
  Edit(time: any) {
    this.PauseWork(time)
  }
  clickCancelEdit() {
    this.showMassgeToUserEdit = false
  }

  CancelPause() {
    this.showMassgeToUserCancelPause = true

  }

  DeletePauseProjectContentItem(PauseGuid: any) {
    this.userService.DeleteProjectContentItemByGuid(PauseGuid).subscribe(
      (res) => {
        this.massageToUser = res;
        swal("הפסקה בוטלה ")
      },
      (err) =>
        swal(err.error))
  }
  clickNoCancel() {
    this.showMassgeToUserCancelPause = false
  }
  clickYesCancel(time: any) {
    this.popUpService.setInPause(false);
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
      this.workTimeHour = ["00:00:00"];
    }
    this.workTimeHour = ""
    localStorage.removeItem("DateNowPause")
    this.pauseGuidForLoclStorage = localStorage.getItem('pauseGuid')
    this.DeletePauseProjectContentItem(this.pauseGuidForLoclStorage)
    this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
    localStorage.removeItem("projectContectItemByTimerGuid")
    this.endButton = false
    localStorage.setItem("endButton", String(this.endButton))
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setSpecificPopUp(false, "pause")
    this.popUpService.setInPause(false);

  }

}
