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
  @Input() TimeProjectContectItem: any
  @Input() endButtonTimerContectProjectContectItem: any
  @Input() showMassgeToUserProjectContectItemWithTimer: any
  @Output() getStartTimer = new EventEmitter<any>();
  @Output() getPauseTimer = new EventEmitter<any>();
  projectContectItemByTimer = "projectContectItemByTimer"
  massgeUserCloseProjectContectItemByTimer = ""

  constructor(private popUpService: PopUpServiceService, private appService: AppService) { }

  ngOnInit(): void {
  }

  startTimeProjectContectItem() {
    this.getStartTimer.emit()
  }
  OpenPopUpIfCloseProjectcontectItemWithTimer(){
    this.getStartTimer.emit()
  }
  clickYes(TimeProjectContectItem: any) {
    alert("לא גמור להשמיך")
  }
  clickNo() {
    this.showMassgeToUserProjectContectItemWithTimer = false
  }
}
