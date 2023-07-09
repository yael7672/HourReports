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
  businessHourToCreateObject:any
  businessHourToUpdateObject:any
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
    localStorage.setItem('DateNowTimer', a.toString());
    debugger;
    this.startDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')
    // this.startDate = this.datePipe.transform(new Date().toUTCString(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC'); // Convert to valid format
    let parsedDate = new Date(Date.parse(this.startDate));
    if (!isNaN(parsedDate.getTime())) {
      this.businessHourToCreateObject = {
        Guid:null,
        SystemUserGuid: this.systemGuid,
        StartTime:this.startDate,
        EndTime:null
        // Participants: ParticipantInGuidence[];
      }
      this.CreateBusinessHours(this.businessHourToCreateObject)
    }
  }


  EndWork() {
    debugger
    this.hideButtonEndTime = false;
    this.endDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')
    // this.endDate = this.datePipe.transform(new Date().toUTCString(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC'); // Convert to valid format
    let parsedDate = new Date(Date.parse(this.endDate));
    if (!isNaN(parsedDate.getTime())) {
      this.guidOfBusinessHour = localStorage.getItem("GuidOfBusinessHour")
        this.businessHourToUpdateObject = {
          Guid:this.guidOfBusinessHour,
          SystemUserGuid: this.systemGuid,
          StartTime:null,
          EndTime:this.endDate
          // Participants: ParticipantInGuidence[];
        }
      this.UpdateBusinessHours(this.businessHourToCreateObject)
    }
  }


  async GetBusinessHourOfEmployeeByDate(systemGuid: any) {
    debugger;
    this.userService.GetBusinessHourOfEmployeeByDate(systemGuid).then(
      res => {
        if (res)
          this.businesHourDetails = res;
        if (this.businesHourDetails.length > 0) {
          if (this.businesHourDetails.startTime) {
            this.hideButtonEndTime = true;
          }
          localStorage.removeItem("GuidOfBusinessHour")
        }
        debugger;
      },
      err => {
        console.log(err.error);
        //  swal("error!", err.error, "error")
      }
    )
  }


  async UpdateBusinessHours(businessHourObject:any) {
    debugger;
    this.userService.UpdateBusinessHours(businessHourObject).then(
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

  async CreateBusinessHours(businessHourToCreateObject:any) {
    debugger;
    this.userService.CreateBusinessHours(businessHourToCreateObject).then(
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
