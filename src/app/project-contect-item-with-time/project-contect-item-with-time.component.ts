import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-project-contect-item-with-time',
  templateUrl: './project-contect-item-with-time.component.html',
  styleUrls: ['./project-contect-item-with-time.component.css']
})
export class ProjectContectItemWithTimeComponent implements OnInit {
  @Input() ifX!: boolean
  @Input() TimeProjectContectItemHour: any
  @Input() endButtonTimerContectProjectContectItem: any
  @Input() showMassgeToUserProjectContectItemWithTimer: any
  @Input() timeToSendCreate: any
  @Input() projectContectItemByTimerGuid: any
  @Output() getStartTimer = new EventEmitter<any>();
  @Output() getPauseTimer = new EventEmitter<any>();
  @Output() OpenPopUp = new EventEmitter<any>();
  projectContectItemByTimer = "projectContectItemByTimer"
  kindPopUp = "UpdateProjectContectItemWithTime"
  massgeUserCloseProjectContectItemByTimer = "האם ברצונך לסיים דיווח זה?"
  timetoSend: any;
  interval: any
  parseTime: any;
  OpenUpdatePauseTimerProjectContectItem = false
  constructor(private popUpService: PopUpServiceService, private appService: AppService) { }

  ngOnInit(): void {
    if (localStorage.getItem("endButtonTimerContectProjectContectItem") == "true") { this.endButtonTimerContectProjectContectItem = true }
    if (localStorage.getItem("endButtonTimerContectProjectContectItem") == "false") { this.endButtonTimerContectProjectContectItem = false }
  }

  startTimeProjectContectItem() {
    this.getStartTimer.emit()
  }
  OpenPopUpIfCloseProjectcontectItemWithTimer() {
    // this.OpenPopUp.emit()
    this.showMassgeToUserProjectContectItemWithTimer = true
  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'projectContectItemByTimer') {
      this.showMassgeToUserProjectContectItemWithTimer = false
    }
  }
  // OpenPopUpIfCloseTimerProjectContectItem() {
  //   this.showMassgeToUserProjectContectItemWithTimer = true
  // }
  clickYes(time: any) {
    this.endButtonTimerContectProjectContectItem = false
    // localStorage.setItem("TimeProjectContectItemHour",time) 
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

      this.pauseTimerProjectContectItem(this.parseTime)
    }
    this.showMassgeToUserProjectContectItemWithTimer = false

  }

  pauseTimerProjectContectItem(time: any) {
    // clearInterval(this.interval)
    this.TimeProjectContectItemHour = ["00:00:00"];
    this.TimeProjectContectItemHour = ""
    localStorage.removeItem("DateNowProjectContectItemWithTimer")
    // this.TimeProjectContectItemHour = null
    this.timeToSendCreate = time
    this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
    this.OpenUpdatePauseTimerProjectContectItem = true
  }

}

