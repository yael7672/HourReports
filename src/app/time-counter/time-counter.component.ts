import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '@progress/kendo-angular-popup';
import swal from 'sweetalert';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.css']
})
export class TimeCounterComponent implements OnInit {

  timerDisplay!: number;

  startTime!: number;

  timerInterval: any;

  isPaused = false;

  systemGuid: any;

  startWorkOfTask = false;
  @Input() descriptionTask!: string;

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
  constructor(private userService: UserServiceService, private datePipe: DatePipe
    , private popUpService: PopUpServiceService, public route: Router) { }

  ngOnInit(): void {
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = true;
      this.ContinueToWorkOnATask();
      this.disabledStartButton = true;
    }
  }

  startTimer() {
    this.disabledStartButton = true;
    this.disabledPauseButton = false;
    this.disabledEndButton = false;
    this.systemGuid = localStorage.getItem('systemGuid');
    this.startWorkOfTask = true;
    if (this.taskListDataDetailsParseToJson.OwnerId.Guid == this.systemGuid.toLowerCase())
      this.IftaskForTeam = false;
    else
      this.IftaskForTeam = true;
    this.userService.CreateProjectContentItemByTaskGuid(this.systemGuid, this.taskListDataDetailsParseToJson.TaskGuid, this.IftaskForTeam).subscribe(res => {
      if (res) {
        this.popUpService.setStartTimer(true);
        this.projectContectItemGuid = res;
        localStorage.setItem("projectContectItemGuid", this.projectContectItemGuid);
        let a = Date.now();
        localStorage.setItem("DateNow", a.toString());
        this.ContinueToWorkOnATask();
        // this.massageFromServer = res;
        this.popUpService.SetProjectContentItemByTaskGuid(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
      }
    }, err => {
      console.log(err.error);
    })
  }
  pauseTimer(time: any) {
    if (this.workTime == 0 || this.workTime < "00:01:00") {
      swal("אין אפשרות לדווח פחות מ-1 דק")
    }
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
        this.userService.UpdateProjectContentItem(this.parseTime ? this.parseTime : "", this.taskListDataDetailsParseToJson.TaskGuid,
          this.isTaskAccomplished, this.descriptionTask).subscribe(
            res => {
              if (res) {
                this.massageFromServer = res;
                swal(this.massageFromServer);
                this.workTime = ["00:00:00"];
                this.popUpService.SetProjectContentItemByTaskGuid(true)
                this.popUpService.SetWorkTimeAfterProjectContectItem(true)
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
    localStorage.removeItem('TaskGuid');
    localStorage.removeItem('TaskGuidTosend');
    localStorage.removeItem('TaskName');
    localStorage.removeItem("DateNow")
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
          this.route.navigate(['/show-my-task'])
          // this.AlertIfActualHoursLessThanAllottedHours(this.taskListDataDetails.TaskGuid, this.parseTime, this.massageFromServer)
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
  //  AlertIfActualHoursLessThanAllottedHours(TaskGuid: any, parseTime: any, massageFromServerUpdate: any) {
  //   this.systemGuid = localStorage.getItem('systemGuid');
  //   this.userService.GetActualTaskHours(this.systemGuid, TaskGuid).subscribe(
  //     res => {
  //       if (res) {
  //         this.TaskByGuidObject = res;
  //         if (this.TaskByGuidObject.WorkingHours == "0") {
  //           swal(massageFromServerUpdate)
  //         }
  //         else
  //           if (this.TaskByGuidObject.WorkingHours > this.TaskByGuidObject.ActualTime) {
  //             this.ifButtonFalse = false
  //             this.showMassgeToUseMIfFinishtasklesstime = true
  //             setTimeout(() => {
  //               this.ifButtonFalse = false
  //               this.showMassgeToUseMIfFinishtasklesstime = false
  //             }, 2000)
  //           }
  //           else {
  //             swal(massageFromServerUpdate)
  //           }
  //       }
  //     },
  //     err => {
  //       console.log(err.error);
  //     }
  //   )
  // }
}
