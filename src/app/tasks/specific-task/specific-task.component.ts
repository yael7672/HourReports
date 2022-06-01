import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';

@Component({
  selector: 'app-specific-task',
  templateUrl: './specific-task.component.html',
  styleUrls: ['./specific-task.component.css']
})
export class SpecificTaskComponent implements OnInit {
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() listData!: any;
  @Input() listDataKeys!: any;
  @Input() kindOfCard!: any;
  @Input() nameOfFunc!: any;
  @Input() val!: any;
  @Input() text!: any;
  @Input() workTime!: any;
  @Input() taskListData!: any;
  @Input() tableDataKeys!: any;
  @Input() isDisabledEnd!: boolean;
  @Input() isDisabledPouse!: boolean;
  @Input() isDisabledStart!: boolean;
  @Output() clickCloseCard = new EventEmitter<any>();
  @Output() clickStartTimer = new EventEmitter<any>();
  @Output() clickPauseTimer = new EventEmitter<any>();
  @Output() clickdeleteTimer = new EventEmitter<any>();
  @Output() objectEmitter = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  heberwDateRecords: any;
  ifDescriptionPanel = false;
  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  //workTime!: any;
  constructor(private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
  }

  ngOnInit(): void {
  }
  closeDescriptionPanel() {
    this.appService.setIsDescriptionPanelOpen(false);
    this.appService.getIsDescriptionPanelOpen().subscribe(res => {
      this.ifDescriptionPanel = res;
    })
  }

  startTimer() {
    this.clickStartTimer.emit()
  }
  pauseTimer(worktime: any) {
    this.clickPauseTimer.emit(worktime)
  }
  deleteTimer(val: any) {
    this.clickdeleteTimer.emit(val)
  }
  SelectedData(val: any) {
    this.objectEmitter.emit(val)
  }
  clickOfButton(kindOfButton: string, type: boolean) {
    this.getDataClickOfButton.emit({ "kind": kindOfButton, "type": type })
  }
  CloseCard() {
    this.clickCloseCard.emit()
  }
}
