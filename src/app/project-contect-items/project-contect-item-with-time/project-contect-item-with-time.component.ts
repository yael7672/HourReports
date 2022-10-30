import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { PopUpServiceService } from '../../pop-up-service.service';

@Component({
  selector: 'app-project-contect-item-with-time',
  templateUrl: './project-contect-item-with-time.component.html',
  styleUrls: ['./project-contect-item-with-time.component.css']
})
export class ProjectContectItemWithTimeComponent implements OnInit {
  @Input() TimeProjectContectItemHour: any
  @Input() endButtonTimerContectProjectContectItem!: boolean;
  @Input() showMassgeToUserProjectContectItemWithTimer!: boolean;
  @Input() showMassgeToUserCancelProjectContectItemWithTimer!: boolean;
  @Input() timeToSendCreate: any
  @Input() projectContectItemByTimerGuid: any
  @Output() getStartTimer = new EventEmitter<any>();
  @Output() getPauseTimer = new EventEmitter<any>();
  @Output() OpenPopUp = new EventEmitter<any>();
  projectContectItemByTimer = "projectContectItemByTimer"
  projectContectItemByTimerCancel="projectContectItemByTimerCancel"
  kindPopUp = "UpdateProjectContectItemWithTime"
  massgeUserCloseProjectContectItemByTimer = "האם ברצונך לסיים דיווח זה?"
  timetoSend: any;
  interval: any
  parseTime: any;
  OpenUpdatePauseTimerProjectContectItem = false
  systemGuid: any;
  Timer: any;
  ifX = true;
  ButtonCancel: boolean = true
  massageToUser: any;
  constructor(private popUpService: PopUpServiceService, private appService: AppService, private userService: UserServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (localStorage.getItem("DateNowProjectContectItemWithTimer")) {
      this.ifX = false;
      this.endButtonTimerContectProjectContectItem = true;
      this.ContinueToWorkOnAProjectContectItemWithTimer()
    }
  }


  OpenPopUpIfCloseProjectcontectItemWithTimer() {
    if (this.TimeProjectContectItemHour == 0 || this.TimeProjectContectItemHour < "00:01:00") {
      swal("אין אפשרות לדווח פחות מ-1 דק")
    }
    else {
      this.showMassgeToUserProjectContectItemWithTimer = true;
    }
  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'projectContectItemByTimerCancel') {
      this.showMassgeToUserCancelProjectContectItemWithTimer = false
    }
  }

  clickYes(time: any) {
    this.endButtonTimerContectProjectContectItem = false;
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
      this.TimeProjectContectItemHour = ["00:00:00"];
      this.pauseTimerProjectContectItem(this.parseTime)
    }
    this.showMassgeToUserProjectContectItemWithTimer = false

  }
  clickCancel(time: any) {
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
      this.TimeProjectContectItemHour = ["00:00:00"];
    }
    this.TimeProjectContectItemHour = ""
    localStorage.removeItem("DateNowProjectContectItemWithTimer")
    this.timeToSendCreate = time
    this.projectContectItemByTimerGuid = localStorage.getItem("projectContectItemByTimerGuid")
    this.DeleteProjectContentItemByGuid(this.projectContectItemByTimerGuid)
    this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
    localStorage.removeItem("projectContectItemByTimerGuid")
    this.showMassgeToUserCancelProjectContectItemWithTimer = false
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setSpecificPopUp(false, "timeOfProjectContectItem")
  }

  DeleteProjectContentItemByGuid(projectContectItemByTimerGuid: any) {
    this.userService.DeleteProjectContentItemByGuid(projectContectItemByTimerGuid).subscribe(
      (res) => {
        this.massageToUser = res;
        swal("!הדיווח בוטל")
        this.popUpService.setAllmyProjectContectItem(true)
      },
      (err) =>
        swal(err.error))
  }
  
  pauseTimerProjectContectItem(time: any) {

    this.TimeProjectContectItemHour = ["00:00:00"];
    this.TimeProjectContectItemHour = ""
    localStorage.removeItem("DateNowProjectContectItemWithTimer")
    this.timeToSendCreate = time
    this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
    this.OpenUpdatePauseTimerProjectContectItem = true

  }

  // זמני פריט תכולת פרויקט עם טיימר
  startTimerProjectContectItem() {
    this.endButtonTimerContectProjectContectItem = true;
    this.ifX = false
    localStorage.setItem("endButtonTimerContectProjectContectItem", JSON.stringify(this.endButtonTimerContectProjectContectItem))
    this.CreateProjectContectItemWithTimer();
    let a = Date.now();
    localStorage.setItem("DateNowProjectContectItemWithTimer", a.toString());
    this.ContinueToWorkOnAProjectContectItemWithTimer();
    this.popUpService.SetProjectContentItemByTaskGuid(true)
    this.popUpService.SetWorkTimeAfterProjectContectItem(true)
  }
  CreateProjectContectItemWithTimer() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.CreateProjectContectItemWithTimer(this.systemGuid).subscribe(
      (res: any) => {
        this.projectContectItemByTimerGuid = res;
        localStorage.setItem("projectContectItemByTimerGuid", this.projectContectItemByTimerGuid)
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  ContinueToWorkOnAProjectContectItemWithTimer() {
    this.getCreatedProjectContectItemWithTimerFromLoaclStorage();
    this.interval = setInterval(() => {
      if (this.TimeProjectContectItemHour) {
        this.getCreatedProjectContectItemWithTimerFromLoaclStorage();
      }
      else {
      }
    }, 1000)
  }
  getCreatedProjectContectItemWithTimerFromLoaclStorage() {
    if (localStorage.getItem('DateNowProjectContectItemWithTimer')) {
      this.setWorkTimeProjectContectItemWithTimer(localStorage.getItem('DateNowProjectContectItemWithTimer'))
    }
  }
  convertTimeStempToTimeProjectContectItemWithTimer(ProjectContentItemCreatedDateByTimer: any) {
    var timestampCreatOn = ProjectContentItemCreatedDateByTimer;
    const timestampNow = Date.now();
    this.Timer = timestampNow - timestampCreatOn;
    return this.datePipe.transform(this.Timer, 'HH:mm:ss', "+0000");

  }
  setWorkTimeProjectContectItemWithTimer(res: any) {
    this.TimeProjectContectItemHour = this.convertTimeStempToTimeProjectContectItemWithTimer(res)
  }

  CancelProjectContectItemWithTimer() {
    this.showMassgeToUserCancelProjectContectItemWithTimer = true
  }


  clickNoCancelProjectContectItemWithTimer() {
    this.showMassgeToUserCancelProjectContectItemWithTimer = false

  }
}

