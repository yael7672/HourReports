import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FlexStyleBuilder } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupComponent } from '@progress/kendo-angular-dropdowns';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
// import { PopupService } from '@progress/kendo-angular-popup';
import swal from 'sweetalert';
import { CONFIRM_KEY } from 'sweetalert/typings/modules/options/buttons';
import { AppService } from '../app-service.service';
import { DetailsTaskAtWork } from '../interfacees/DetailsTaskAtWork';
import { openSpecificTask } from '../interfacees/openSpecificTask';
import { OpenTask } from '../interfacees/OpenTask';
import { TaskByGuid } from '../interfacees/TaskByGuid';
import { tasksDetails } from '../interfacees/tasksDetails';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.css']
})
export class TimeCounterComponent implements OnInit {

  @Input() descriptionTask!: string;
  systemGuid: any;
  startWorkOfTask = false;
  projectContectItemGuid: any;
  workTime: any;
  Time: any;
  interval: any;
  IftaskForTeam = false
  taskListDataDetailsParseToJson: any;
  disabledStartButton = false
  disabledPauseButton = false
  disabledEndButton = false
  timetoSend: any;
  timetoSend2: any;
  parseTime: any;
  isDisabledStart = false;
  isTaskAccomplished = false;
  taskListDataDetails: any;
  massageFromServer: any;
  ifInPause = false
  showMassgeToUserCancelProjectContectItemOfTask = false
  hideStartAndShowCancelProjectContectItem !: boolean;
  projectContectItemOfTask = "projectContectItemOfTask"
  kindPopUp = "cancelProjectContectItemOfTask"
  massgeUserCloseProjectContectItemByTimer = "האם ברצונך לבטל דיווח זה?"
  timeToSendCreate: any;
  massageToUser: any;
  time: any
  showMassageToUSERifMiiddlePauseAndOpenTask = false;
  hideDelayAndShowRenewProjectContectItemOnTask = false;
  UserifMiiddlePauseAndOpenTask = "UserifMiiddlePauseAndOpenTask";
  massgeUserOpenTimerTaskInMiddlePause = "שים לב אתה באמצע הפסקה האם ברצונך לסיימה ולהתחיל לעבוד על משימה?";
  timePauseInterval: any;
  openSpecificTaskDetails: any = {}
  openTasksDetails: any[] = [];
  parseTimeDate: any;
  projectContentItemArr: any;
  projectContectItemByGuidDeatils: any;
  latest_date: any;
  myDate = new Date();
  todayDate: any;
  openTasks!: any[]
  TaskGuid: any;
  inMiddleTask = false
  timeTaskInDelay: any
  isInMiddleTask!: any
  TaskGuid2: any
  openTasksInLs: OpenTask[] = []
  openTasksDetailsFromLs: any
  timeContinueTaskAfterDelay: any
  openTasksDetailsFromLsParseToJson!: OpenTask[]
  TimeStartWorkTask: any;
  dateTaskBeforeDelay: any;
  TimeStartWorkTaskDateNow: any;
  TimeStartWorkTaskDateNowOpenTask: any;
  workTimeInRenew: any
  timerNew: any
  Time2: any
  timerOfTask: any
  timeInDateFormat = new Date()
  prevTimeInDateFormat: any
  ContinueToWorkOnATask2Params = false
  TimeStartWorkAfterRefreshTaskDateNowOpenTask: any;
  timeOnOpenTaskAfterDelayTimeZoneLS: any;
  timeOnOpenTaskAfterDelayStringLS: any;
  ifRefreshPageInMIddleWorkTask = false
  timeTaskOnOpenTask: any
  massageFromServerUpdateTaskAtWork: any
  DetailsTaskAtWork!: DetailsTaskAtWork[]
  timeFromServer: any
  SpecificTaskDetails: any
  timeBeforeParse: any
  timeBeforeParseInt: any;
  timeBeforeParseIntDecimal: any;
  hours: any;
  second: any;
  minutesInDec: any;
  timeBeforeParseDecimal: any
  minutes: any;
  secondInInt: any;
  secondInInt1: any;
  secondEnd: any;
  hoursForDate: any
  timeWithTimeBefore: any
  timeBeforeInTimeZone: any
  timeTaskAtWork: any
  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private datePipe: DatePipe,
    private popUpService: PopUpServiceService, public route: Router, private appService: AppService) {
    this.popUpService.getInPause().subscribe(res => {
      this.ifInPause = res;
    })
    this.popUpService.getOpenTaskPopUp().subscribe(res => {
      this.openTasks = res;
      console.log("this.openTasks")
      console.log(this.openTasks)
    })
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);
    this.systemGuid = localStorage.getItem('systemGuid');
    this.GetDetailsTaskAtWork(true)

    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = true;
      this.ContinueToWorkOnATask();
      this.disabledStartButton = true;
      if (this.workTime) {
        this.hideStartAndShowCancelProjectContectItem = true;
      }
    }
    this.CheckIfMiddleOfTask()
  }

  CheckIfMiddleOfTask() {
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
  }

  startTimer() {
    if (this.ifInPause) {
      this.showMassageToUSERifMiiddlePauseAndOpenTask = true
    }
    else {
      this.popUpService.setifInTheMiddleOfWorkingOnATask(true);
      this.hideStartAndShowCancelProjectContectItem = true
      this.disabledStartButton = true;
      this.disabledPauseButton = false;
      this.disabledEndButton = false;
      this.systemGuid = localStorage.getItem('systemGuid');
      this.startWorkOfTask = true;
      if (this.taskListDataDetailsParseToJson.OwnerId.Guid == this.systemGuid.toLowerCase())
        this.IftaskForTeam = false;
      else
        this.IftaskForTeam = true;
      this.taskListDataDetailsParseToJson.Date = this.todayDate
      this.userService.CreateProjectContentItemByTaskGuid(this.systemGuid, this.taskListDataDetailsParseToJson.TaskGuid, this.IftaskForTeam).subscribe(res => {
        if (res) {
          this.popUpService.setStartTimer(true);
          this.projectContectItemGuid = res;
          localStorage.setItem("projectContectItemGuid", this.projectContectItemGuid);
          let a = Date.now();
          this.UpdateTaskAtWork(this.taskListDataDetailsParseToJson.TaskGuid, true)
          localStorage.setItem('DateNow', a.toString());
          this.ContinueToWorkOnATask();
          this.massageFromServer = res;
          this.popUpService.SetProjectContentItemByTaskGuid(true)
          this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        }
      }, err => {
        console.log(err.error);
      })
    }
  }

  clickNoFinishPauseAndStartTimerTask() {

    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, 'pause')
    this.showMassageToUSERifMiiddlePauseAndOpenTask = false

  }
  clickYesOpenPauseToFinish() {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, 'pause')
    this.showMassageToUSERifMiiddlePauseAndOpenTask = false

  }

  cancelProjectContectItenOnTask() {
    this.showMassgeToUserCancelProjectContectItemOfTask = true
  }

  clickNo() {
    this.showMassgeToUserCancelProjectContectItemOfTask = false
  }

  clickYes(time: any) {
    this.hideStartAndShowCancelProjectContectItem = false;
    this.hideDelayAndShowRenewProjectContectItemOnTask = false;
    if (time.worktime != "" || time != null) {
      clearInterval(this.interval);
      this.timeToSendCreate = time
      this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid")
      this.workTime = ["00:00:00"];
      this.workTime = ""
      localStorage.removeItem('DateNow')
      this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
      this.DeleteProjectContentItemByGuid(this.projectContectItemGuid)
    }
    this.showMassgeToUserCancelProjectContectItemOfTask = false
  }

  DeleteProjectContentItemByGuid(projectContectItemByTaskGuid: any) {
    this.userService.DeleteProjectContentItemByGuid(projectContectItemByTaskGuid).subscribe(
      (res) => {
        this.massageToUser = res;
        swal("!הדיווח בוטל")
        this.popUpService.setStartTimer(false);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        this.popUpService.setAllmyProjectContectItem(true)
      },
      (err) =>
        swal(err.error))
  }

  pauseTimer(time: any) {
    debugger
    if (this.workTime == 0 || this.workTime < "00:01:00")
      swal("אין אפשרות לדווח פחות מ-1 דק")
    else {
      this.popUpService.setifInTheMiddleOfWorkingOnATask(false);
      localStorage.removeItem("interval")
      this.hideStartAndShowCancelProjectContectItem = false
      this.hideDelayAndShowRenewProjectContectItemOnTask = true
      this.popUpService.setStartTimer(false);
      this.disabledPauseButton = true;
      this.disabledStartButton = false;
      localStorage.removeItem('TaskGuid');
      localStorage.removeItem('TaskName');
      localStorage.getItem('TaskGuidToSend');
      localStorage.removeItem('DateNow');
      this.startWorkOfTask = false;
      if (time != "" || !time) {
        this.timetoSend = time.split(':')
        clearInterval(this.interval);
        if (this.timetoSend[2] > 30) {
          this.timetoSend[1]++;
        }
        this.timetoSend[1] = (this.timetoSend[1] / 60)
        this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
        this.isDisabledStart = false;
        this.isTaskAccomplished = false;
        this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
        this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);

        this.userService.UpdateProjectContentItem(this.projectContectItemGuid, this.parseTime ? this.parseTime : 0
          , this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").then(
            res => {
              if (res) {
                this.massageFromServer = res;
                swal(this.massageFromServer);
                this.workTime = ["00:00:00"];
                localStorage.removeItem("TimeInDateFormat")
                localStorage.removeItem("timerOfTask")

                this.popUpService.SetProjectContentItemByTaskGuid(true)
                this.popUpService.SetWorkTimeAfterProjectContectItem(true);
                this.hideStartAndShowCancelProjectContectItem = false;

              }
            },
            err => {
              console.log(err.error);
            }
          )
      }
    }
  }

  endTimer(time: any) {
    debugger
    this.appService.setSpinner(true);
    this.popUpService.setifInTheMiddleOfWorkingOnATask(false);
    localStorage.removeItem("interval");
    this.popUpService.setStartTimer(false);
    this.disabledPauseButton = true;
    this.disabledStartButton = true;
    this.disabledEndButton = true;
    this.startWorkOfTask = false;
    if (time != "00:00:00" && time !== undefined && time != "") {
      this.timetoSend = time?.split(':');
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    }
    this.isTaskAccomplished = true;
    this.workTime = ["00:00:00"];
    // this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    // this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    // if (this.openTasksDetailsFromLsParseToJson != null) {
    //   this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
    //     if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid)
    //       this.projectContectItemGuid = element.ProjectContectItemGuid
    //   });
    // }
    // else {
    //   this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid");
    // }
    this.userService.UpdateProjectContectItemByTask(this.parseTime ? this.parseTime : "", this.taskListDataDetailsParseToJson.TaskGuid, this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          this.appService.setSpinner(false);
          this.systemGuid = localStorage.getItem('systemGuid');
          swal(this.massageFromServer);
          // לבדוק - כמה משימות יחד 2 הנתונים הראשונים זה רק במקרה והמשימה נפתחה ונסגרה בפעם הראשןנה
          localStorage.removeItem("TimeInDateFormat")
          localStorage.removeItem("timerOfTask")
          localStorage.removeItem("DateNow")
          localStorage.removeItem('DateNowOpenTask')
          this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
            if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid) delete this.openTasksInLs[index];
          });
          localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
          this.route.navigate(['/menu/show-my-task', this.systemGuid])
          this.popUpService.setAllmyTask(true)
          this.popUpService.SetProjectContentItemByTaskGuid(true)
          this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        }
      },
      err => {
        console.log(err.error);
        swal(err.error)
        this.appService.setSpinner(false);

      }
    )
  }
  ContinueToWorkOnATask() {
    this.getCreatedProjectContentItemFromLoaclStorage();
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage();
      }
    }, 1000)
  }

  getCreatedProjectContentItemFromLoaclStorage() {
    if (localStorage.getItem('DateNow')) {
      this.setWorkTime(localStorage.getItem('DateNow'))
    }
  }

  setWorkTime(res: any) {
    this.workTime = this.convertTimeStempToTime(res)
  }
  convertTimeStempToTime(ProjectContentItemCreatedDate: any) {
    var timestampCreatOn = ProjectContentItemCreatedDate;
    const timestampNow = Date.now();
    this.Time = timestampNow - timestampCreatOn;
    this.timerOfTask = this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
  }

  delayProjectContectItenOnTask(time: any) {
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.removeItem('DateNow')
    this.interval = 0
    this.popUpService.setStartTimer(false);
    this.hideDelayAndShowRenewProjectContectItemOnTask = true
    this.hideStartAndShowCancelProjectContectItem = true
    this.timePauseInterval = time
    this.popUpService.setStartTimer(false);
    this.disabledPauseButton = true;
    this.disabledStartButton = false;
    this.startWorkOfTask = false;
    this.isTaskAccomplished = false;
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);

    if (time != "00:00:00" && time !== undefined && time != "") {
      this.timetoSend = time?.split(':');
      clearInterval(this.interval);
      this.interval = 0

      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];

      this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid")

      this.userService.UpdateProjectContentItem(this.projectContectItemGuid, this.parseTime ? this.parseTime : 0
        , this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").then(
          res => {
            if (res) {
              this.massageFromServer = res;
              // swal(this.massageFromServer);
              // localStorage.removeItem("TimeInDateFormat")
              // localStorage.removeItem("timerOfTask")
              this.popUpService.SetProjectContentItemByTaskGuid(true)
              this.popUpService.SetWorkTimeAfterProjectContectItem(true);

            }
          },
          err => {
            console.log(err.error);
          }
        )
    }
  }

  renewProjectContectItenOnTask(workTime: any) {
    if (this.ifInPause) {
      this.showMassageToUSERifMiiddlePauseAndOpenTask = true
    }
    else {
      this.popUpService.setifInTheMiddleOfWorkingOnATask(true);
      this.hideDelayAndShowRenewProjectContectItemOnTask = false
      this.hideStartAndShowCancelProjectContectItem = true
      this.disabledPauseButton = false
      const timeNow = Date.now()
      localStorage.setItem('DateNow', timeNow.toString())
      this.systemGuid = localStorage.getItem('systemGuid');
      this.startWorkOfTask = true;
      if (this.taskListDataDetailsParseToJson.OwnerId.Guid == this.systemGuid.toLowerCase())
        this.IftaskForTeam = false;
      else
        this.IftaskForTeam = true;
      this.taskListDataDetailsParseToJson.Date = this.todayDate
      this.popUpService.SetWorkTimeAfterProjectContectItem(true)

      this.GetDetailsTaskAtWork()
      // this.ContinueToWorkOnATask2();
    }
  }


  UpdateTaskAtWork(taskId: any, status: boolean) {
    this.userService.UpdateTaskAtWork(this.systemGuid, taskId, status).subscribe(
      res => {
        if (res) {
          this.massageFromServerUpdateTaskAtWork = res;
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }


  GetDetailsTaskAtWork(IsConvert?: boolean) {
    this.userService.GetDetailsTaskAtWork(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.DetailsTaskAtWork = res;
          if (this.DetailsTaskAtWork.length > 0) {
            this.DetailsTaskAtWork?.forEach((element, index) => {
              if (this.TaskGuid2 == element?.taskGuid) {
                this.SpecificTaskDetails = element
              }
            })
            if (!IsConvert) {
              this.convertParseTimeToTimer(this.SpecificTaskDetails)
            }
          }
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }
  convertParseTimeToTimer(SpecificTaskDetails: any) {
    this.minutesInDec = 0
    this.second = 0
    this.timeTaskAtWork = 0
    this.hours = 0
    this.minutes = 0
    this.timeTaskAtWork = SpecificTaskDetails.timeWork
    this.projectContectItemGuid = SpecificTaskDetails.LastProjectContectItemGuid
    localStorage.setItem("projectContectItemGuid", this.projectContectItemGuid)
    this.minutesInDec = (this.timeTaskAtWork % 1)
    this.hours = this.timeTaskAtWork - this.minutesInDec
    this.hoursForDate = this.hours + 2
    if (this.hours < 10) {
      this.hours = "0" + this.hours
    }
    this.minutesInDec = this.minutesInDec * 60
    if (this.minutesInDec % 1 != 0) {
      this.minutes = this.minutesInDec - (this.minutesInDec % 1)
      this.second = this.minutesInDec % 1
      // this.second = this.second * 60
      this.secondInInt = this.second - (this.second % 1)
      this.secondInInt1 = this.secondInInt
      if (this.secondInInt >= 30 && this.secondInInt <= 59) {
        this.minutes = this.minutes + 1
      }
      this.secondEnd = this.second - (this.second % 1)
    }
    else {
      this.secondEnd = "00"
      this.minutes = this.minutesInDec
    }
    this.timeInDateFormat.setHours(this.hoursForDate)
    this.timeInDateFormat.setMinutes(this.minutes)
    this.timeInDateFormat.setSeconds(this.secondEnd)
    this.timeBeforeInTimeZone = Date.parse(this.timeInDateFormat.toString());
    // this.workTime = this.datePipe.transform(this.timeBeforeInTimeZone, 'HH:mm:ss', "+0000")
    this.ContinueToWorkOnATask2(this.timeBeforeInTimeZone)

  }


  ContinueToWorkOnATask2(timeBeforeInTimeZone: any) {
    this.getCreatedProjectContentItemFromLoaclStorage2(timeBeforeInTimeZone);
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage2(timeBeforeInTimeZone);
      }
    }, 1000)
  }

  getCreatedProjectContentItemFromLoaclStorage2(timeBeforeInTimeZone: any) {
    if (localStorage.getItem('DateNow')) {
      this.setWorkTime2(localStorage.getItem('DateNow'), timeBeforeInTimeZone)
    }
  }

  setWorkTime2(res: any, timeBeforeInTimeZone: any) {
    this.workTime = this.convertTimeStempToTime2(res, timeBeforeInTimeZone)
  }
  convertTimeStempToTime2(ProjectContentItemCreatedDate: any, timeBeforeInTimeZone: any) {
    var timestampCreatOn = ProjectContentItemCreatedDate;
    const timestampNow = Date.now();
    this.Time = timestampNow - timestampCreatOn;
    this.timeWithTimeBefore = Number(this.Time) + Number(timeBeforeInTimeZone)
    this.timerOfTask = this.datePipe.transform(this.timeWithTimeBefore, 'HH:mm:ss', "+0000");

    if (this.timerOfTask != "" || !this.timerOfTask) {
      this.timetoSend = this.timerOfTask.split(':')
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];

      this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid")
      this.userService.UpdateProjectContentItem(this.projectContectItemGuid, this.parseTime ? this.parseTime : 0
        , false, this.descriptionTask ? this.descriptionTask : "").then(
          res => {
            if (res) {
              this.massageFromServer = res;
              this.popUpService.SetWorkTimeAfterProjectContectItem(true);
            }
          },
          err => {
            console.log(err.error);
          }
        )
    }
    return this.timerOfTask
  }

  // check() {
  //   this.minutes = 0
  //   this.second = 0
  //   this.time = 0
  //   this.hours = 0
  //   this.minutes2 = 0
  //   this.time = 3.5
  //   this.minutes = (this.time % 1)
  //   this.hours = this.time - this.minutes
  //   this.hoursForDate = this.hours + 2
  //   if (this.hours < 10) {
  //     this.hours = "0" + this.hours
  //   }
  //   this.minutes = this.minutes * 60
  //   if (this.minutes % 1 != 0) {
  //     this.minutes2 = this.minutes - (this.minutes % 1)
  //     this.second = this.minutes % 1
  //     this.second = this.second * 60
  //     this.timeBeforeParseInt2 = this.second - (this.second % 1)
  //     this.timeBeforeParseInt3 = this.timeBeforeParseInt2
  //     if (this.timeBeforeParseInt2 >= 30 && this.timeBeforeParseInt2 <= 59) {
  //       this.minutes2 = this.minutes2 + 1
  //     }
  //     this.secondEnd = this.second - (this.second % 1)
  //   }
  //   else {
  //     this.secondEnd = "00"
  //     this.minutes2 = this.minutes
  //   }
  //   this.workTime = this.hours + ":" + this.minutes2 + ":" + this.secondEnd
  //   this.today.setHours(this.hoursForDate)
  //   this.today.setMinutes(this.minutes2)
  //   this.today.setSeconds(this.secondEnd)
  //   const javaScriptRelease2 = Date.parse(this.today.toISOString());
  //   this.workTime = this.datePipe.transform(javaScriptRelease2, 'HH:mm:ss', "+0000")


  // }
}
