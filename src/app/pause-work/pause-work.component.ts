import { DatePipe } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-pause-work',
  templateUrl: './pause-work.component.html',
  styleUrls: ['./pause-work.component.css']
})
export class PauseWorkComponent implements OnInit {

  todayDate!: any;
  myDate = new Date()
  pauseAlert: any
  systemGuid: any
  @Input() workTime!: any;
  @Output() ClickStartPause = new EventEmitter<any>();
  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  endButton!: boolean
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
  }

  ngOnInit(): void {

  }

  PauseWork(form: NgForm) {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.userServiceService.PauseWork(this.systemGuid, form.value.ActualTime).subscribe(
      (res: any) => {
        this.pauseAlert = res;
        console.log(this.pauseAlert)
        alert("עודכן");
      },
      (err: any) =>
        alert("error")
    )
  }
  startPause() {
    this.endButton == false
    this.ClickStartPause.emit()
    
  }
}
