import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FlexStyleBuilder } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
// import { PopupService } from '@progress/kendo-angular-popup';
import swal from 'sweetalert';
import { CONFIRM_KEY } from 'sweetalert/typings/modules/options/buttons';
import { AppService } from '../app-service.service';
import { openSpecificTask } from '../interfacees/openSpecificTask';
import { OpenTask } from '../interfacees/OpenTask';
import { TaskByGuid } from '../interfacees/TaskByGuid';
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
  timeInDateFormat: any
  prevTimeInDateFormat: any
  ContinueToWorkOnATask2Params = false
  TimeStartWorkAfterRefreshTaskDateNowOpenTask: any;
  timeOnOpenTaskAfterDelayTimeZoneLS: any;
  timeOnOpenTaskAfterDelayStringLS: any;
  ifRefreshPageInMIddleWorkTask = false
  timeTaskOnOpenTask: any
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
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = true;
      this.ContinueToWorkOnATask();
      this.disabledStartButton = true;
      if (this.workTime) {
        this.hideStartAndShowCancelProjectContectItem = true;
      }
    }
    //debugger
    this.CheckIfMiddleOfTask()
  }

  CheckIfMiddleOfTask() {

    // localStorage.removeItem('openTasksInLsDetails')
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
        if (this.TaskGuid2 == element?.TaskGuid) {
          this.timeOnOpenTaskAfterDelayTimeZoneLS = localStorage.getItem('timeOnOpenTaskAfterDelayTimeZone')
          this.timeOnOpenTaskAfterDelayStringLS = localStorage.getItem('timeOnOpenTaskAfterDelayString')
          if (this.timeOnOpenTaskAfterDelayTimeZoneLS && this.timeOnOpenTaskAfterDelayStringLS) {
            this.openTasksDetailsFromLsParseToJson[index].ParseTime = this.timeOnOpenTaskAfterDelayTimeZoneLS;
            this.openTasksDetailsFromLsParseToJson[index].TimeTask = this.timeOnOpenTaskAfterDelayStringLS;
            this.hideDelayAndShowRenewProjectContectItemOnTask = false
            element.TimeTask = this.timeOnOpenTaskAfterDelayStringLS.split(':')
            if (element.TimeTask) {
              // this.timeTaskOnOpenTask = element.TimeTask.split(':')
              this.workTime = [element.TimeTask[0] + ":" + element.TimeTask[1] + ":" + element.TimeTask[2]]

            }
            localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
            // this.workTime = this.datePipe.transform(element.ParseTime, 'HH:mm:ss', "+0000");
          }
          else {
            // this.openTasksDetailsFromLsParseToJson[index].ParseTime = element.ParseTime;
            // this.openTasksDetailsFromLsParseToJson[index].TimeTask = element.TimeTask;
            this.hideDelayAndShowRenewProjectContectItemOnTask = true
            if (element.TimeTask)
            this.timeTaskOnOpenTask = element.TimeTask.split(':')
            this.workTime = [this.timeTaskOnOpenTask[0] + ":" + this.timeTaskOnOpenTask[1] + ":" + this.timeTaskOnOpenTask[2]]
            localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
          }

          this.timeContinueTaskAfterDelay = element.ParseTime
          localStorage.setItem("timeContinueTaskAfterDelay", this.timeContinueTaskAfterDelay)
          this.inMiddleTask = true
          this.hideStartAndShowCancelProjectContectItem = true
          localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
          if (localStorage.getItem('timeOnOpenTaskAfterDelayTimeZone') && localStorage.getItem('timeOnOpenTaskAfterDelayString')) {
            var a = Date.now().toString()
            this.ifRefreshPageInMIddleWorkTask = true
            this.ContinueToWorkOnATask2(a, this.ifRefreshPageInMIddleWorkTask)
          }
        }
        // else {
        // this.workTime = ["00:00:00"];
        // this.workTime = [];
        // this.inMiddleTask = true
        // this.hideStartAndShowCancelProjectContectItem = false
        // this.hideDelayAndShowRenewProjectContectItemOnTask = false
        // }
      });
    }

  }

  startTimer() {
    //debugger
    if (this.ifInPause) {
      this.showMassageToUSERifMiiddlePauseAndOpenTask = true
    }
    else {
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
    if (this.workTime == 0 || this.workTime < "00:01:00")
      swal("אין אפשרות לדווח פחות מ-1 דק")
    else {
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
        this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
        this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
        if (this.openTasksDetailsFromLsParseToJson != null) {
          this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
            if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid)
              this.projectContectItemGuid = element.ProjectContectItemGuid

          });
        }
        else {
          this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid");
        }
        this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : "", this.projectContectItemGuid,
          this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
            res => {
              if (res) {
                this.massageFromServer = res;
                swal(this.massageFromServer);
                this.workTime = ["00:00:00"];
                localStorage.removeItem("TimeInDateFormat")
                localStorage.removeItem("timerOfTask")
                this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
                  if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid) delete this.openTasksDetailsFromLsParseToJson[index];
                });

                localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
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
    localStorage.removeItem("interval")

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
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
        if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid)
          this.projectContectItemGuid = element.ProjectContectItemGuid

      });
    }
    else {
      this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid");
    }

    this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : "", this.projectContectItemGuid, this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          this.systemGuid = localStorage.getItem('systemGuid');
          // לבדוק - כמה משימות יחד 2 הנתונים הראשונים זה רק במקרה והמשימה נפתחה ונסגרה בפעם הראשןנה
          localStorage.removeItem("TimeInDateFormat")
          localStorage.removeItem("timerOfTask")
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
      }
    )
  }
  ContinueToWorkOnATask() {
    this.getCreatedProjectContentItemFromLoaclStorage();
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage();
      }
      if (Number(this.interval) > 0 && this.interval != null) {
        localStorage.setItem("interval", this.interval)
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
    localStorage.setItem("TimeInDateFormat", this.Time)
    localStorage.setItem("timerOfTask", this.timerOfTask)
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
  }
  updateTimeOnOpenTaskAfterDelayInLocalStorage() {
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
        if (this.TaskGuid2 == element?.TaskGuid) {
          if (localStorage.getItem('timeOnOpenTaskAfterDelayTimeZone') && localStorage.getItem('timeOnOpenTaskAfterDelayString')) {
            this.openTasksDetailsFromLsParseToJson[index].ParseTime = localStorage.getItem('timeOnOpenTaskAfterDelayTimeZone');
            this.openTasksDetailsFromLsParseToJson[index].TimeTask = localStorage.getItem('timeOnOpenTaskAfterDelayString');
            localStorage.removeItem('timeOnOpenTaskAfterDelayTimeZone');
            localStorage.removeItem('timeOnOpenTaskAfterDelayString');
          }
          // console.log(this.openTasksDetailsFromLsParseToJson);
          localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
          // console.log(this.openTasksDetailsFromLsParseToJson);
        }
      })
    }
  }
  delayProjectContectItenOnTask(time: any) {
    this.updateTimeOnOpenTaskAfterDelayInLocalStorage();
    localStorage.removeItem("interval");
    clearInterval(this.interval);
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
    this.timeInDateFormat = localStorage.getItem("TimeInDateFormat")
    this.timerOfTask = localStorage.getItem("timerOfTask")
    if (this.timeInDateFormat && this.timerOfTask) {
      this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
      this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
      // אם המערך ריק מכניס אליו
      if (this.openTasksDetailsFromLs == null || this.openTasksDetailsFromLs?.length == 0) {
        this.openTasksInLs.push({ ProjectContectItemGuid: this.projectContectItemGuid, TaskGuid: this.TaskGuid2, TimeTask: this.timerOfTask, ParseTime: this.timeInDateFormat, Type: this.isInMiddleTask })
        localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))

      }
      // עידכון מערך קיים- בודק אם יש כבר את המשימה במערך ומעדכן עליה
      if (this.openTasksDetailsFromLs != null || this.openTasksDetailsFromLs?.length >= 0) {
        this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
          if (this.TaskGuid2 == element?.TaskGuid) {
            this.openTasksInLs.push({ ProjectContectItemGuid: this.openTasksDetailsFromLsParseToJson[index].ProjectContectItemGuid, TaskGuid: this.openTasksDetailsFromLsParseToJson[index].TaskGuid, TimeTask: this.openTasksDetailsFromLsParseToJson[index].TimeTask, ParseTime: this.openTasksDetailsFromLsParseToJson[index].ParseTime, Type: this.openTasksDetailsFromLsParseToJson[index].Type })
            this.openTasksInLs.push({ ProjectContectItemGuid: element.ProjectContectItemGuid, TaskGuid: element.TaskGuid, TimeTask: element.TimeTask, ParseTime: element.ParseTime, Type: element.Type })
            localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))

          }
          else {//אם משימה שלא עבדתי עליה ,אבל יש עוד משימות פתוחות
            // this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
            this.openTasksInLs.push({ ProjectContectItemGuid: this.openTasksDetailsFromLsParseToJson[index]?.ProjectContectItemGuid, TaskGuid: this.openTasksDetailsFromLsParseToJson[index]?.TaskGuid, TimeTask: this.openTasksDetailsFromLsParseToJson[index]?.TimeTask, ParseTime: this.openTasksDetailsFromLsParseToJson[index]?.ParseTime, Type: this.openTasksDetailsFromLsParseToJson[index]?.Type })
            this.openTasksInLs.push({ ProjectContectItemGuid: this.projectContectItemGuid, TaskGuid: this.TaskGuid2, TimeTask: this.timerOfTask, ParseTime: this.timeInDateFormat, Type: this.isInMiddleTask })
            localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))
          }
        })
      }

      localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))
      this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
      this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
      localStorage.removeItem("TimeInDateFormat")
      localStorage.removeItem("timerOfTask")
    }
    this.popUpService.setStartTimer(false);
    this.TimeStartWorkTaskDateNow = localStorage.getItem('DateNow')
    this.TimeStartWorkTaskDateNowOpenTask = localStorage.getItem('DateNowOpenTask')
    localStorage.removeItem("DateNow")
    localStorage.removeItem('DateNowOpenTask')
    if (this.TimeStartWorkTaskDateNow) {
      this.TimeStartWorkTask = this.TimeStartWorkTaskDateNow
    }
    else {
      if (this.TimeStartWorkTaskDateNowOpenTask) {
        this.TimeStartWorkTask = this.TimeStartWorkTaskDateNowOpenTask
      }
    }
    const DatePauseTask = Date.now().toString()
    this.dateTaskBeforeDelay = Number(DatePauseTask) - Number(this.TimeStartWorkTask)
    localStorage.setItem('dateTaskBeforeDelay', this.dateTaskBeforeDelay)
    this.hideDelayAndShowRenewProjectContectItemOnTask = true
    this.timePauseInterval = time
    this.popUpService.setStartTimer(false);
    this.disabledPauseButton = true;
    this.disabledStartButton = false;
    this.startWorkOfTask = false;
    this.isTaskAccomplished = false;
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.isInMiddleTask = true
    localStorage.setItem('DatePauseTask', DatePauseTask.toString())
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
        if (element?.TaskGuid == this.TaskGuid2)
          this.projectContectItemGuid = element.ProjectContectItemGuid
      });
    }
    else {
      this.projectContectItemGuid = localStorage.getItem("projectContectItemGuid");
    }
    if (time != "" || !time) {
      this.timetoSend = time.split(':')
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    }
    this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : 0, this.projectContectItemGuid,
      this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(res => {
        if (res) {
          this.massageFromServer = res;
          swal(this.massageFromServer);
          this.popUpService.SetProjectContentItemByTaskGuid(true)
          this.popUpService.SetWorkTimeAfterProjectContectItem(true);
          this.hideStartAndShowCancelProjectContectItem = true;
        }
      },
        err => {
          console.log(err.error);
        })
  }

  renewProjectContectItenOnTask(workTime: any) {
    //debugger
    if (this.ifInPause) {
      this.showMassageToUSERifMiiddlePauseAndOpenTask = true
    }
    else {
      // this.interval = 1
      this.hideDelayAndShowRenewProjectContectItemOnTask = false
      // this.hideStartAndShowCancelProjectContectItem = false
      this.disabledPauseButton = false
      const timeNow = Date.now()
      localStorage.setItem('DateNowOpenTask', timeNow.toString())
      this.systemGuid = localStorage.getItem('systemGuid');
      this.startWorkOfTask = true;
      if (this.taskListDataDetailsParseToJson.OwnerId.Guid == this.systemGuid.toLowerCase())
        this.IftaskForTeam = false;
      else
        this.IftaskForTeam = true;
      this.taskListDataDetailsParseToJson.Date = this.todayDate
      this.popUpService.SetWorkTimeAfterProjectContectItem(true)
      this.ContinueToWorkOnATask2();
    }
  }

  ContinueToWorkOnATask2(date?: any, ifRefreshPageInMIddleWorkTask?: any) {
    this.getCreatedProjectContentItemFromLoaclStorage2(date, ifRefreshPageInMIddleWorkTask);
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage2(date, ifRefreshPageInMIddleWorkTask);
        if (Number(this.interval) > 0 && this.interval != null) {
          localStorage.setItem("interval", this.interval)
        }

      }
    }, 1000)
  }

  getCreatedProjectContentItemFromLoaclStorage2(date?: any, ifRefreshPageInMIddleWorkTask?: any) {
    //debugger
    this.TimeStartWorkTaskDateNow = localStorage.getItem('DateNow')
    this.TimeStartWorkTaskDateNowOpenTask = localStorage.getItem('DateNowOpenTask')
    this.TimeStartWorkAfterRefreshTaskDateNowOpenTask = date
    if (this.TimeStartWorkTaskDateNow) {
      this.setWorkTime2(this.TimeStartWorkTaskDateNow)
    }
    else {
      if (this.TimeStartWorkAfterRefreshTaskDateNowOpenTask && ifRefreshPageInMIddleWorkTask) {
        this.ifRefreshPageInMIddleWorkTask = false
        ifRefreshPageInMIddleWorkTask = false
        localStorage.setItem('DateNowOpenTask', this.TimeStartWorkAfterRefreshTaskDateNowOpenTask)
        this.setWorkTime2(this.TimeStartWorkAfterRefreshTaskDateNowOpenTask)

      }
      else {
        if (this.TimeStartWorkTaskDateNowOpenTask) {
          this.setWorkTime2(this.TimeStartWorkTaskDateNowOpenTask)
        }
      }
    }

  }
  setWorkTime2(res: any) {
    //debugger
    this.workTime = this.convertTimeStempToTime3(res)
  }
  convertTimeStempToTime3(renewTime: any) {
    //debugger
    var timestampCreatOn = renewTime;
    const timestampNow = Date.now();
    this.Time2 = timestampNow - Number(timestampCreatOn);
    // this.timerOfTask = this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson?.forEach((element, index) => {
        if (this.TaskGuid2 == element?.TaskGuid) {
          this.prevTimeInDateFormat = this.openTasksDetailsFromLsParseToJson[index].ParseTime;
          if (this.prevTimeInDateFormat != null) {
            this.Time2 = Number(this.Time2) + Number(this.prevTimeInDateFormat);
            // console.log(this.Time2);

          }

          this.timerNew = this.datePipe.transform(this.Time2, 'HH:mm:ss', "+0000");
          this.openTasksDetailsFromLsParseToJson[index].ParseTime = 0;
          this.openTasksDetailsFromLsParseToJson[index].ParseTime = this.Time2;
          // console.log(this.openTasksDetailsFromLsParseToJson);
          this.openTasksDetailsFromLsParseToJson[index].TimeTask = 0;
          this.openTasksDetailsFromLsParseToJson[index].TimeTask = this.timerNew;
          localStorage.setItem('timeOnOpenTaskAfterDelayTimeZone', this.Time2);
          localStorage.setItem('timeOnOpenTaskAfterDelayString', this.timerNew);
        }
        // localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))

      })
    }

    return this.timerNew;

  }

  // convertTimeStempToTime2(ProjectContentItemContinueCreateDate: any) {
  //   //debugger
  //   const timestampNow = Date.now();
  //   var timestampContinueCreatOn = Number(ProjectContentItemContinueCreateDate);
  //   this.Time = timestampNow - timestampContinueCreatOn;
  //   this.timerNew = this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
  //   this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
  //   this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
  //   if (this.openTasksDetailsFromLsParseToJson != null) {
  //     this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
  //       if (this.TaskGuid2 == element.TaskGuid) {
  //         this.prevTimeInDateFormat = this.openTasksDetailsFromLsParseToJson[index].ParseTime
  //         // this.interval = localStorage.getItem("interval")
  //         const time0 = (Number(this.Time) / Number(this.interval))
  //         this.Time2 = Number(this.prevTimeInDateFormat) + Number(time0) + Number(1000)
  //         this.timerNew = this.datePipe.transform(this.Time2, 'HH:mm:ss', "+0000");
  //         this.openTasksDetailsFromLsParseToJson[index].ParseTime = this.Time2
  //         this.openTasksDetailsFromLsParseToJson[index].TimeTask = this.timerNew
  //       }
  //     })
  //   }

  //   localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksDetailsFromLsParseToJson))
  //   return this.timerNew
  // }

}
