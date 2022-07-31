import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-project-contect-item-with-time',
  templateUrl: './project-contect-item-with-time.component.html',
  styleUrls: ['./project-contect-item-with-time.component.css']
})
export class ProjectContectItemWithTimeComponent implements OnInit {
  @Input() ifX = true
  @Input() TimeProjectContectItemHour: any
  @Input() endButtonTimerContectProjectContectItem: any
  @Input() showMassgeToUserProjectContectItemWithTimer: any
  @Input() timeToSendCreate:any
  @Input() projectContectItemByTimerGuid:any
  @Output() getStartTimer = new EventEmitter<any>();
  @Output() getPauseTimer = new EventEmitter<any>();
  @Output() OpenPopUpIf = new EventEmitter<any>();
  projectContectItemByTimer = "projectContectItemByTimer"
  kindPopUp="UpdateProjectContectItemWithTime"
  massgeUserCloseProjectContectItemByTimer = ""
  timetoSend: any;
  interval: any
  parseTime: any;
  OpenUpdatePauseTimerProjectContectItem = false
  constructor(private popUpService: PopUpServiceService, private appService: AppService) { }

  ngOnInit(): void {
  }

  startTimeProjectContectItem() {
    this.getStartTimer.emit()
  }
  OpenPopUpIfCloseProjectcontectItemWithTimer() {
    this.OpenPopUpIf.emit()
  }
  clickNo() {
    this.showMassgeToUserProjectContectItemWithTimer = false
  }
  clickYes(time: any) {
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
    clearInterval(this.interval)
    localStorage.removeItem("DateNowProjectContectItemTimer")
    this.TimeProjectContectItemHour = null
    this.endButtonTimerContectProjectContectItem = false
    this.timeToSendCreate = time
    this.popUpService.SetIfXProjectContectItemUpdateWithTime(true)
    this.OpenUpdatePauseTimerProjectContectItem=true
  }

}

