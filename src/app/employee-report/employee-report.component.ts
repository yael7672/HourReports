import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  employeeListKeys = ['EmployeeName', 'EmployeeJob', 'EmployeeJobPercentage', 'EmployeeDailyWorkingHours', 'EmployeeMonthlyWorkingHours', 'TotalMonthlyWorkingHours', 'MonthlyTargetByJobScope'];
  thArrEmployee = ['שם העובד', 'תפקיד העובד', 'אחוז משרה', 'ש"ע יומי', 'ש"ע חודשי', 'סה"כ שעות בחודש', 'יעד חודשי לפי משרה'];
  employeeDetails: any;
  ifSortDown = false;
  systemGuid: any;
  showGraph = true
  ifShowAndEditEmployeeSetting = true
  isPopUpOpen: any;
  employeeDetailsVal: any;
  constructor(private userService: UserServiceService, public route: Router
    ,public popUpService:PopUpServiceService,private appService:AppService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
    })
   }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.GetEmployeeDetails();

  }
  GetEmployeeDetails() {
    this.userService.GetEmployeeDetails(this.systemGuid).subscribe(
      (res: any) => {
        this.employeeDetails = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'שם העובד':
        keyToSort = 'EmployeeName';
        break;
      case 'תפקיד העובד':
        keyToSort = 'EmployeeJob';
        break;
      case 'אחוז משרה':
        keyToSort = 'EmployeeJobPercentage';
        break;
      case 'שעות עבודה שביצע היום':
        keyToSort = 'EmployeeDailyWorkingHours';
        break;
      case 'שעות עבודה שביצע החודש':
        keyToSort = 'EmployeeMonthlyWorkingHours';
        break;

      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.employeeDetails?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort] )) ? 1 : -1)
    }
    else {
      this.employeeDetails?.sort((a: any, b: any) =>
        (a[keyToSort[1]] > (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;
    let keyToSort: any;
    switch (thName) {
      case 'שם העובד':
        keyToSort = 'EmployeeName';
        break;
      case 'תפקיד העובד':
        keyToSort = 'EmployeeJob';
        break;
      case 'אחוז משרה':
        keyToSort = 'EmployeeJobPercentage';
        break;
      case 'שעות עבודה שביצע היום':
        keyToSort = 'EmployeeDailyWorkingHours';
        break;
      case 'שעות עבודה שביצע החודש':
        keyToSort = 'EmployeeMonthlyWorkingHours';
        break;

      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.employeeDetails?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.employeeDetails?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }

  openProjectContentItemByEmployeeGuid(val: any) {
    this.route.navigate(['/project-contect-items-by-employee', val.EmployeeGuid])
    localStorage.setItem('employeeDetails', JSON.stringify(val))
  }
  openTasksByEmployeeGuid(val: any) {
    this.route.navigate(['/tasks-by-employee', val.EmployeeGuid])
    localStorage.setItem('employeeDetails', JSON.stringify(val))
  }

  editEmployeeDetailsByAdmin(val: any){ 
    this.employeeDetailsVal = val
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true,"EditEmployeeDetailsByAdmin") 

    localStorage.setItem('employeeDetails', JSON.stringify(val))
  }
}
