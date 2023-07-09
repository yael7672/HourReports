import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-time-clock-employee',
  templateUrl: './time-clock-employee.component.html',
  styleUrls: ['./time-clock-employee.component.css']
})
export class TimeClockEmployeeComponent implements OnInit {
  workTimeHour: any
  startDate: any;
  endDate: any;
  systemGuid: any;
  updateBusinessHoursRes: any;
  createBusinessHoursRes: any;
  guidOfBusinessHour: any
  hideButtonEndTime = false
  businesHourDetails: any;

  constructor(private datePipe: DatePipe, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.GetBusinessHourOfEmployeeByDate(this.systemGuid)
  }

  startWork() {
    debugger;
    this.hideButtonEndTime = true;
    // this.popUpService.setStartTimer(true);
    let a = Date.now();
    localStorage.setItem('DateNow', a.toString());
    debugger;
    this.startDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')
    this.CreateBusinessHours(this.startDate, null, this.systemGuid)
  }


  EndWork() {
    this.hideButtonEndTime = false;
    this.endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')
    this.guidOfBusinessHour = localStorage.getItem("GuidOfBusinessHour")
    this.UpdateBusinessHours(null, this.endDate, this.systemGuid, this.guidOfBusinessHour)
  }


  async GetBusinessHourOfEmployeeByDate(systemGuid: any) {
    debugger;
    this.userService.GetBusinessHourOfEmployeeByDate(systemGuid).then(
      res => {
        if (res)
          this.businesHourDetails = res;
          if(this.businesHourDetails.startTime){
            this.hideButtonEndTime = true;
          }
        localStorage.removeItem("GuidOfBusinessHour")
        debugger;
      },
      err => {
        console.log(err.error);
        //  swal("error!", err.error, "error")
      }
    )
  }


  async UpdateBusinessHours(startDate: any, endDate: any, systemGuid: any, Guid: any) {
    debugger;
    this.userService.UpdateBusinessHours(startDate, endDate, systemGuid, Guid).then(
      res => {
        if (res)
          this.updateBusinessHoursRes = res;
        localStorage.removeItem("GuidOfBusinessHour")
        debugger;
      },
      err => {
        console.log(err.error);
        //  swal("error!", err.error, "error")
      }
    )
  }

  async CreateBusinessHours(startDate: any, endDate: any, systemGuid: any) {
    debugger;
    this.userService.CreateBusinessHours(startDate, endDate, systemGuid).then(
      res => {
        if (res)
          this.guidOfBusinessHour = res;
        localStorage.setItem("GuidOfBusinessHour", this.guidOfBusinessHour)
        debugger;
      },
      err => {
        console.log(err.error);
        //  swal("error!", err.error, "error")
      }
    )
  }

}
