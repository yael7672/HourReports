import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-details-of-working-hours-employee',
  templateUrl: './details-of-working-hours-employee.component.html',
  styleUrls: ['./details-of-working-hours-employee.component.css']
})
export class DetailsOfWorkingHoursEmployeeComponent implements OnInit {


  WorkingHoursListKeys = ['Date', 'DayOnMonth', 'DailyWorkingHours', 'DailyWorkingHoursthatAreMissing'];
  thArrWorkingHours = ['תאריך', 'יום בחודש', 'ש"ע יומי', 'ש"ע יומיות - חסרות'];
  detailsOfWorkingHourByEmployee!: any[];
  ifSortDown = false;
  systemGuid: any;
  showGraph = true
  ifShowAndEditEmployeeSetting = true
  isPopUpOpen: any;
  employeeDetailsVal: any;
  title = "פרטי שעות עבודה";
  hoursReportedThisMonth!: any;
  workingDaysThisMonth: any;
  dateToUpdate: any;
  constructor(private userService: UserServiceService, public route: Router
    , public popUpService: PopUpServiceService, private appService: AppService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
    })
  }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.getDetailsOfWorkingHourByEmployee(1)
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
      this.detailsOfWorkingHourByEmployee?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.detailsOfWorkingHourByEmployee?.sort((a: any, b: any) =>
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
      this.detailsOfWorkingHourByEmployee?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.detailsOfWorkingHourByEmployee?.sort((a: any, b: any) =>
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

  editEmployeeDetailsByAdmin(val: any) {
    this.employeeDetailsVal = val
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, "EditEmployeeDetailsByAdmin")

    localStorage.setItem('employeeDetails', JSON.stringify(val))
  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.route.navigate(['employee-report'])
    }
    if (val == 1) {
      this.route.navigate(['team-report'])
    }
  }
  
  getDetailsOfWorkingHourByEmployee(val: any) {
    this.userService.GetDetailsOfWorkingHourByEmployee(this.systemGuid, val).subscribe(res => {
      if (res) {
        this.detailsOfWorkingHourByEmployee = res;
        this.detailsOfWorkingHourByEmployee.forEach((x: any) => {
          if (x.HoursReportedThisMonth != 0) {
            this.hoursReportedThisMonth = x.HoursReportedThisMonth;
          }
          if (x.WorkingDaysThisMonth != 0) {
            this.workingDaysThisMonth = x.WorkingDaysThisMonth;
          }

        });
        console.log(this.hoursReportedThisMonth);
      }
    },
      err => {
        console.log(err.error);
      })
  }
  createReport(val: any) {
    this.dateToUpdate= val.Date;
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, "createAprojectContentItem")
  }
}