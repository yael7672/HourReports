import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlexStyleBuilder } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
// import { PopupService } from '@progress/kendo-angular-popup';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { openSpecificTask } from '../interfacees/openSpecificTask';
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
          localStorage.setItem("DateNow", a.toString());
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
      localStorage.removeItem("DateNow")
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
      localStorage.removeItem("DateNow");
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
        this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : "", this.taskListDataDetailsParseToJson.TaskGuid,
          this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
            res => {
              if (res) {
                this.massageFromServer = res;
                swal(this.massageFromServer);
                this.workTime = ["00:00:00"];
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
    this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : "", this.taskListDataDetailsParseToJson.TaskGuid, this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          this.systemGuid = localStorage.getItem('systemGuid');
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
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
  }

  delayProjectContectItenOnTask(time: any) {
    this.hideDelayAndShowRenewProjectContectItemOnTask = true
    this.timePauseInterval = time
    this.popUpService.setStartTimer(false);
    this.disabledPauseButton = true;
    this.disabledStartButton = false;
    this.startWorkOfTask = false;
    clearInterval(this.interval);
    if (time != "" || !time) {
      this.timetoSend = time.split(':')
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
      // this.isDisabledStart = false;
      this.isTaskAccomplished = false;
      this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
      this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);
      this.openSpecificTaskDetails.Name = this.taskListDataDetailsParseToJson.Subject ? this.taskListDataDetailsParseToJson.Subject : ""
      this.openSpecificTaskDetails.Time = this.timetoSend ? this.timetoSend : 0
      this.openSpecificTaskDetails.ProjectContectItemGuid = this.projectContectItemGuid ? this.projectContectItemGuid : ""
      this.openTasksDetails.push(this.openSpecificTaskDetails)
      this.TaskGuid = this.activatedRoute.snapshot.paramMap.get('id');
      // this.openTasks.push(this.openSpecificTaskDetails.ProjectContectItemGuid, this.TaskGuid,true)
      this.popUpService.setOpenTaskPopUp(this.openSpecificTaskDetails.ProjectContectItemGuid, this.TaskGuid, true)
      //לשים אחרי שהמשימה נסגרת 
      //   this.openTasks.forEach((element,index)=>{ 
      //   if(element.TaskGuid == "") delete this.openTasks[index];
      //  });

      let DatePauseTask = Date.now()
      localStorage.setItem('DatePauseTask', DatePauseTask.toString())
      localStorage.setItem('openTasksDetails', JSON.stringify(this.openTasksDetails))
      // console.log(this.openTasksDetails);

      this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : 0, this.taskListDataDetailsParseToJson.TaskGuid,
        this.isTaskAccomplished, this.descriptionTask ? this.descriptionTask : "").subscribe(
          res => {
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
  }


  renewProjectContectItenOnTask(workTime: any) {
    this.hideDelayAndShowRenewProjectContectItemOnTask = false
    // this.hideStartAndShowCancelProjectContectItem = false
    this.disabledPauseButton = false
    this.openTasksDetails.forEach((item, index) => {
      if (item === this.taskListDataDetailsParseToJson.Subject) {
        this.openTasksDetails.splice(index, 1);
      }
      this.userService.GetProjectContentItemByGuid(item.ProjectContectItemGuid).subscribe(res => {
        if (res) {
          this.projectContectItemByGuidDeatils = res;
        }
      });
    })







    // 
    // 
    // 
    // 
    // 

    this.ContinueToWorkOnATask2()
    // this.Time = timestampNow.getTime() - timestampCreatOn.getTime();
    // this.latest_date = this.datePipe.transform(this.Time, 'HH:mm:ss');
    // alert( this.latest_date);
    // localStorage.setItem('DateNow',)

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
    if (localStorage.getItem('DateNow')) {
      this.setWorkTime(localStorage.getItem('DateNow'))
    }

  }
  setWorkTime2(res: any) {
    this.workTime = this.convertTimeStempToTime2(res)
  }
  convertTimeStempToTime2(ProjectContentItemCreatedDate: any) {
    var timestampCreatOn = ProjectContentItemCreatedDate;
    const timestampNow = Date.now();
    let DatePauseTask = localStorage.getItem("DatePauseTask")
    // this.Time = timestampNow - timestampCreatOn - DatePauseTask;
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
  }







}
