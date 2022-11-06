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
    this.CheckIfMiddleOfTask()
  }
  CheckIfMiddleOfTask() {
    // localStorage.removeItem('openTasksInLsDetails')
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson.forEach(element => {
        if (this.TaskGuid2 == element.TaskGuid) {
          element.TimeTask = element.TimeTask.split(':')
          this.workTime = [element.TimeTask[0] + ":" + element.TimeTask[1] + ":" + element.TimeTask[2]]
          // this.workTime = this.datePipe.transform(element.ParseTime, 'HH:mm:ss', "+0000");
          this.timeContinueTaskAfterDelay = element.ParseTime
          localStorage.setItem("timeContinueTaskAfterDelay", this.timeContinueTaskAfterDelay)
          this.inMiddleTask = true
          this.hideStartAndShowCancelProjectContectItem = true
          this.hideDelayAndShowRenewProjectContectItemOnTask = true
        }
        if (this.TaskGuid2 != element.TaskGuid) {
          this.workTime = ["00:00:00"];
          this.workTime = [];
          this.inMiddleTask = true
          this.hideStartAndShowCancelProjectContectItem = false
          this.hideDelayAndShowRenewProjectContectItemOnTask = false
        }
      });
    }
  }

  startTimer() {
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
    // this.time=localStorage.getItem("")
    // if ( this.time.worktime != "" ||  this.time != null) {
    //   this.timetoSend =  this.time.worktime ?  this.time.worktime.split(':') :  this.time.split(':')
    //   clearInterval(this.interval);
    //   if (this.timetoSend[2] > 30) {
    //     this.timetoSend[1]++;
    //   }
    //   this.timetoSend[1] = (this.timetoSend[1] / 60)
    //   this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    //   if (this.parseTime == undefined) {
    //     this.parseTime = "";
    //   }
    // }
    // this.popUpService.setInPause(false);

    // this.endButton = false
    // this.showMassgeToUserEdit = true

    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, 'pause')
    this.showMassageToUSERifMiiddlePauseAndOpenTask = false

  }
  clickYesOpenPauseToFinish() {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, 'pause')
    this.showMassageToUSERifMiiddlePauseAndOpenTask = false
    // this.time=localStorage.getItem("")
    // if ( this.time.worktime != "" ||  this.time != null) {
    //   this.timetoSend =  this.time.worktime ?  this.time.worktime.split(':') :  this.time.split(':')
    //   clearInterval(this.interval);
    //   if (this.timetoSend[2] > 30) {
    //     this.timetoSend[1]++;
    //   }
    //   this.timetoSend[1] = (this.timetoSend[1] / 60)
    //   this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    //   if (this.parseTime == undefined) {
    //     this.parseTime = "";
    //   }
    // }
    // this.popUpService.setInPause(false);

    // this.endButton = false
    // this.showMassgeToUserEdit = true
    // this.route.navigate(['/menu/specific-task', this.taskListDataDetailsParseToJson.TaskGuid])
    // this.startTimer()

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
          this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
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
                this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
                  if (element.TaskGuid == this.taskListDataDetailsParseToJson.TaskGuid) delete this.openTasksInLs[index];
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
      this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
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
          this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
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

  delayProjectContectItenOnTask(time: any) {
    clearInterval(this.interval);
    this.interval = 1
    this.TaskGuid2 = this.activatedRoute.snapshot.paramMap.get('id');
    this.timeInDateFormat = localStorage.getItem("TimeInDateFormat")
    this.timerOfTask = localStorage.getItem("timerOfTask")
    if (this.timeInDateFormat && this.timerOfTask) {
      this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
      this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
        // אם המערך ריק מכניס אליו
        if (this.openTasksDetailsFromLs == null  ) {
          this.openTasksInLs.push({ ProjectContectItemGuid: this.projectContectItemGuid, TaskGuid: this.TaskGuid2, TimeTask: this.timerOfTask, ParseTime: this.timeInDateFormat, Type: this.isInMiddleTask })
          localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))

        }
      // עידכון מערך קיים- בודק אם יש כבר את המשימה במערך ומעדכן עליה
      if (this.openTasksDetailsFromLs != null  ) {
        this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
          if (this.TaskGuid2 == element.TaskGuid) {
            this.openTasksInLs.push({ ProjectContectItemGuid: element.ProjectContectItemGuid, TaskGuid: element.TaskGuid, TimeTask: element.TimeTask, ParseTime: element.ParseTime, Type: element.Type })
            localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))

          }
          else {
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
    // else {
    //   this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    //   this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    //   if (this.openTasksDetailsFromLsParseToJson != null) {
    //     this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
    //       if (this.TaskGuid2 == element.TaskGuid) {
    //         // לשים פה את המספרים של הWORK TIME שחוזרים בRENEW הסופי 
    //        this.openTasksInLs[index].ParseTime =
    //         this.openTasksInLs[index].TimeTask= time
    //       }
    //     })
    //   }
    //   // this.openTasksInLs.push({ ProjectContectItemGuid: this.projectContectItemGuid, TaskGuid: this.TaskGuid, TimeTask: this.timeTaskInDelay, ParseTime: this.parseTime, Type: this.isInMiddleTask })
    //   localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))
    // }

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
    //  כמה זמן עבד על המשימה מאז שהתחיל טיימר חדש עד עכשו
    // alert(this.datePipe.transform(this.dateTaskBeforeDelay, 'HH:mm:ss', "+0000"))
    // עכשו - מתי התחיל את המשימה= סה"כ כמה עבד על המשימה
    localStorage.setItem('dateTimeTaskInMilliSecond', this.dateTaskBeforeDelay)
    // this.CheckIfMiddleOfTask()
    this.hideDelayAndShowRenewProjectContectItemOnTask = true
    this.timePauseInterval = time
    this.popUpService.setStartTimer(false);
    this.disabledPauseButton = true;
    this.disabledStartButton = false;
    this.startWorkOfTask = false;
    // this.isDisabledStart = false;
    this.isTaskAccomplished = false;
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    //this.popUpService.setOpenTaskPopUp(this.openSpecificTaskDetails.ProjectContectItemGuid, this.TaskGuid, this.timeTaskInDelay, true)
    this.isInMiddleTask = true

    //לשים אחרי שהמשימה נסגרת 
    //   this.openTasksInLs.forEach((element,index)=>{ 
    //   if(element.TaskGuid == "") delete this.openTasksInLs[index];
    //  });
    localStorage.setItem('DatePauseTask', DatePauseTask.toString())
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
        if (element.TaskGuid == this.TaskGuid2)
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
    // localStorage.setItem('openTasksDetails', JSON.stringify(this.openTasksDetails))
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
    // this.CheckIfMiddleOfTask()
    // this.workTime = workTime
    // alert(workTime)
    // לבדוק
    // setInterval(this.interval)
    if (this.ifInPause) {
      this.showMassageToUSERifMiiddlePauseAndOpenTask = true
    }
    else {
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
      // if (workTime != "" || !workTime) {
      // this.timetoSend = workTime.split(':')
      // this.timetoSend = workTime
      // this.timetoSend2 = workTime.split(':')

      // clearInterval(this.interval);
      // if (this.timetoSend2[2] > 30) {
      //   this.timetoSend2[1]++;
      // }
      // this.timetoSend2[1] = (this.timetoSend2[1] / 60)

      // }
      this.ContinueToWorkOnATask2();
    }
  }

  ContinueToWorkOnATask2() {
    this.getCreatedProjectContentItemFromLoaclStorage2();
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage2();
      }
    }, 1000)
  }

  getCreatedProjectContentItemFromLoaclStorage2() {
    this.TimeStartWorkTaskDateNow = localStorage.getItem('DateNow')
    this.TimeStartWorkTaskDateNowOpenTask = localStorage.getItem('DateNowOpenTask')
    if (this.TimeStartWorkTaskDateNow) {
      this.setWorkTime2(this.TimeStartWorkTaskDateNow)
    }
    else {
      if (this.TimeStartWorkTaskDateNowOpenTask) {
        this.setWorkTime2(this.TimeStartWorkTaskDateNowOpenTask)
      }
    }

  }
  setWorkTime2(res: any) {
    this.workTime = this.convertTimeStempToTime2(res)

  }
  convertTimeStempToTime2(ProjectContentItemContinueCreateDate: any) {
    const timestampNow = Date.now();
    let DatePauseTask = localStorage.getItem('dateTimeTaskInMilliSecond')
    // if (this.workTime != "" || !this.workTime) {
    //   this.timetoSend = this.workTime.split(':')
    //   clearInterval(this.interval);
    //   if (this.timetoSend[2] > 30) {
    //     this.timetoSend[1]++;
    //   }
    // }
    // this.timetoSend[1] = (this.timetoSend[1] / 60)
    // this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    // המרה של PARSTIME לשניות
    // var timestampContinueCreatOn = Number(ProjectContentItemContinueCreateDate);

    // this.timeContinueTaskAfterDelay = localStorage.getItem("timeContinueTaskAfterDelay")
    // this.timeContinueTaskAfterDelay = Number(this.timeContinueTaskAfterDelay)
    // var datum = Date.parse(this.timeContinueTaskAfterDelay);
    // const Time2 = datum / 1000;
    //  לבדוק המרה של WORKTIME
    // this.Time = Number(timestampNow) - timestampContinueCreatOn;
    // 
    var timestampContinueCreatOn = Number(ProjectContentItemContinueCreateDate);
    this.Time = timestampNow - timestampContinueCreatOn;

    this.timerNew = this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
    //  alert("this.timerNew" + this.timerNew)
    // this.timerNew = this.timerNew.split(':')
    // if (this.Time2 == null || this.Time2 == "" || this.Time2 == undefined) {
    //   this.Time2 = "00:00:00"
    //   this.Time2 = this.Time2.split(':')

    // }
    // if ((Number(this.timerNew[2]) + Number(this.timetoSend2[2])) > 59) {
    //   this.Time2[2] = String(Number("00"))
    //   this.Time2[1] = Number(this.Time2[1]) + (1)
    // }
    // else {
    //   this.Time2[2] = Number(this.timerNew[2]) + Number(this.timetoSend2[2])
    // }
    // if ((Number(this.timerNew[1]) + Number(this.timetoSend2[1])) > 59) {
    //   this.Time2[1] = String(Number("00"))
    //   this.Time2[0] = Number(this.Time2[0]) + (1)
    // }
    // else {
    //   this.Time2[2] = Number(this.timerNew[2]) + Number(this.timetoSend2[2])
    // }
    // this.Time2[0] = Number(this.timerNew[0]) + Number(this.timetoSend2[0])
    // this.Time2 = [(this.Time2[0]) + ":" + (this.Time2[1]) + ":" + (this.Time2[2])]

    // convert timer oclock this.workTime to millisecond
    // 
    this.openTasksDetailsFromLs = localStorage.getItem('openTasksInLsDetails')
    this.openTasksDetailsFromLsParseToJson = JSON.parse(this.openTasksDetailsFromLs)
    if (this.openTasksDetailsFromLsParseToJson != null) {
      this.openTasksDetailsFromLsParseToJson.forEach((element, index) => {
        if (this.TaskGuid2 == element.TaskGuid) {
          this.prevTimeInDateFormat = this.openTasksInLs[index].ParseTime
          const time0 = (Number(this.Time) / Number(this.interval))
          // var datum = Date.parse(this.Time);
          // // const Time5 = datum / 1000;
          this.Time2 = Number(this.prevTimeInDateFormat) + Number(time0) + Number(1000)
          this.timerNew = this.datePipe.transform(this.Time2, 'HH:mm:ss', "+0000");
          this.openTasksInLs[index].ParseTime = this.Time2
          this.openTasksInLs[index].TimeTask = this.timerNew
        }
      })
    }
    // 
    localStorage.setItem('openTasksInLsDetails', JSON.stringify(this.openTasksInLs))

    return this.timerNew

  }




  cli(workTime: any) {

    let given_seconds = 3685;

    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = hours.toString().padStart(2, '0')
      + ':' + minutes.toString().padStart(2, '0')
      + ':' + seconds.toString().padStart(2, '0');
  }


}
