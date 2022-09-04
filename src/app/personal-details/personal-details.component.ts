import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { MonthlyAndDailyWorkingHours } from '../interfacees/MonthlyAndDailyWorkingHours';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  systemName!: any;
  systemMail!: any;
  systemGuid!: any;
  @Input() ifX!: boolean;
  @Input() todayDate: any;
  @Output() openPopUp = new EventEmitter<any>();
  @Output() closePersonalDetails = new EventEmitter<any>();
  DailyAndMonthlyWorkingHours:any;

  constructor(public route: Router, private appService: AppService, private popUpService: PopUpServiceService,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.systemName = localStorage.getItem('systemName');
    this.systemMail = localStorage.getItem('systemMail');
    this.GetDailyWorkingHoursAndMonthlyWorkingHours();
  }
  LogOut() {
    localStorage.clear();
    this.route.navigate(['/login'])
  }
  openPopUpp(data: string, type: boolean) {
    this.openPopUp.emit({ date: data, type: type })
  }
  closePersonalDetailss() {
    this.closePersonalDetails.emit()
  }
  goTpHoursAwaitingApproval() {
    this.route.navigate(['/hours-awaiting-approval-component'])
  }
  GetDailyWorkingHoursAndMonthlyWorkingHours() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.DailyAndMonthlyWorkingHours = res;
          console.log( this.DailyAndMonthlyWorkingHours);
          
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  goToEmployeeReport()
  {
    this.route.navigate(['/employee-report'])
  }
}
