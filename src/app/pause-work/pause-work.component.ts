import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-pause-work',
  templateUrl: './pause-work.component.html',
  styleUrls: ['./pause-work.component.css']
})
export class PauseWorkComponent implements OnInit {

  todayDate!:any;
  myDate=new Date()
  pauseAlert:any
  systemGuid: any ="E64663CA-1992-EC11-B400-000D3A44707D";
  constructor(private datePipe: DatePipe, private userServiceService:UserServiceService ) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   console.log(this.todayDate);
}

  ngOnInit(): void {

  }
PauseWork(form:NgForm){
  this.userServiceService.PauseWork(this.systemGuid ,form.value.ActualTime).subscribe(
    (res: any) => {
      this.pauseAlert = res;
      console.log(this.pauseAlert);
    },
    (err: any) =>
      alert("error")
  )
}
}
