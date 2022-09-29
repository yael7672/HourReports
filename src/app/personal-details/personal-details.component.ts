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
  DailyAndMonthlyWorkingHours: any;
  MessageToTheManagerRes: any;
  IfMessageToTheManager = false
  image:any;

  constructor(public route: Router, private appService: AppService, private popUpService: PopUpServiceService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.systemName = localStorage.getItem('systemName');
    this.systemMail = localStorage.getItem('systemMail');
    this.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid); 
       this.image = localStorage.getItem('image');

  }
  LogOut() {

    localStorage.clear();
    this.route.navigate(['/menu/login'])
  }
  openPopUpp(data: string, type: boolean) {
    this.openPopUp.emit({ date: data, type: type })
  }
  closePersonalDetailss() {
    this.closePersonalDetails.emit()
  }
  goTpHoursAwaitingApproval() {
    this.route.navigate(['/menu/hours-awaiting-approval-component'])
  }
  GetDailyWorkingHoursAndMonthlyWorkingHours(systemGuid: any) {

    this.userService.GetDailyWorkingHoursAndMonthlyWorkingHours(systemGuid).subscribe(
      res => {
        if (res) {
          this.DailyAndMonthlyWorkingHours = res;
          console.log(this.DailyAndMonthlyWorkingHours);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  goToEmployeeReport() {
    this.route.navigate(['/menu/employee-report'])
  }
  goToDetailsOfWorkingHours() {
    this.popUpService.setNavBar(false);
    this.route.navigate(['/menu/details-of-working-hours-employee', this.systemGuid])
  }
  MessageToTheManager() {
    this.userService.MessageToTheManager().subscribe(
      res => {
        if (res) {
          this.MessageToTheManagerRes = res
         
        }
      }, err => {
        console.log(err.error)
      }
    )
    if (this.MessageToTheManagerRes) {
       this.IfMessageToTheManager = true
      // this.route.navigate(['/menu/employee-report'])
    }
  }

  goToSystemSetting(){
    this.route.navigate(['/menu/system-setting'])
  }
}
