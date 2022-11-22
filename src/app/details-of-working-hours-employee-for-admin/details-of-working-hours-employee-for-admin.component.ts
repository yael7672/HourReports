import { DatePipe } from '@angular/common';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-details-of-working-hours-employee-for-admin',
  templateUrl: './details-of-working-hours-employee-for-admin.component.html',
  styleUrls: ['./details-of-working-hours-employee-for-admin.component.css']
})
export class DetailsOfWorkingHoursEmployeeForAdminComponent implements OnInit {
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  WorkingHoursListKeys = ['Date', 'DayOnMonth', 'DailyWorkingHours', 'DailyWorkingHoursthatAreMissing'];
  thArrWorkingHours = ['תאריך', 'יום בחודש', 'ש"ע יומי', 'ש"ע יומיות - חסרות'];
  detailsOfWorkingHourByEmployee!: any[];
  ifSortDown = false;
  systemGuid: any;
  showGraph = true
  ifShowAndEditEmployeeSetting = true
  isPopUpOpen: any;
  employeeDetailsVal: any;
  hoursReportedThisMonth!: any;
  workingDaysThisMonth: any;
  dateToUpdate: any;
  detailsOfWorkingHourByEmployeeToSend: any = [];
  employeeDetailsParseJson: any;
  employeeDetails: any;
  titleTable: any;
  reportsBySpesificDate: any;
  spesificDate: any;
  projectContentItem: any;
  projectContentItemGuid: any;
  fromDate: any;
  untilDate: any;
  todayDate!: any;
  myDate = new Date();
  showInputsDates = false;
  ifShowSpinner!: boolean;
  spesificDateForCreateReport: any;
  whichDetailsOfWorkingHourOpen!: any;
  constructor(private userService: UserServiceService, public route: Router
    , public popUpService: PopUpServiceService, private appService: AppService, private datepipe: DatePipe, private activatedRoute: ActivatedRoute) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    this.appService.getSpinner().subscribe(res => {
      this.ifShowSpinner = res;
    })
    this.popUpService.getDetailsOfWorkingHoursEmployeeForAdmin().subscribe(res => {
      if (res) {
        this.whichDetailsOfWorkingHourOpen = Number(localStorage.getItem('whichDetailsOfWorkingHourOpen'));
        if (this.whichDetailsOfWorkingHourOpen != 3) {
          this.getDetailsOfWorkingHourByEmployee(this.whichDetailsOfWorkingHourOpen);
        }
        else {
          this.fromDate = localStorage.getItem('fromDate');
          this.untilDate = localStorage.getItem('untilDate');
          // this.sortByDateRange();
        }
      }
    })
  }
  ngOnInit(): void {
    this.todayDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
    this.employeeDetails = localStorage.getItem('employeeDetails');
    this.employeeDetailsParseJson = JSON.parse(this.employeeDetails);
    this.titleTable = this.titleTable = '  התפוקה היומית של ' + this.employeeDetailsParseJson?.EmployeeName;
    this.systemGuid = localStorage.getItem('systemGuid')
    this.getDetailsOfWorkingHourByEmployee(1)
  }

  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'יום בחודש':
        keyToSort = 'DayOnMonth';
        break;
      case 'ש"ע יומי':
        keyToSort = 'DailyWorkingHours';
        break;
      case 'ש"ע יומיות - חסרות':
        keyToSort = 'DailyWorkingHoursthatAreMissing';
        break;
      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.detailsOfWorkingHourByEmployeeToSend?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.detailsOfWorkingHourByEmployeeToSend?.sort((a: any, b: any) =>
        (a[keyToSort[1]] > (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;
    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'יום בחודש':
        keyToSort = 'DayOnMonth';
        break;
      case 'ש"ע יומי':
        keyToSort = 'DailyWorkingHours';
        break;
      case 'ש"ע יומיות - חסרות':
        keyToSort = 'DailyWorkingHoursthatAreMissing';
        break;
      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.detailsOfWorkingHourByEmployeeToSend?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.detailsOfWorkingHourByEmployeeToSend?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.route.navigate(['/menu/employee-report'])
    }
    if (val == 1) {
      this.route.navigate(['/menu/team-report'])
    }
  }

  getDetailsOfWorkingHourByEmployee(val: any) {
    if (val == "") {
      this.appService.setSpinner(true);
      val = 1;
    }
    localStorage.setItem('whichDetailsOfWorkingHourOpen', val)
    if (val == 3) {
      this.showInputsDates = true;
    }
    else {
      if (val == 2) {
        this.appService.setSpinner(true);
      }
      this.showInputsDates = false;
      this.detailsOfWorkingHourByEmployeeToSend = [];
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.GetDetailsOfWorkingHourByEmployee(this.systemGuid, val, this.fromDate ? this.fromDate : "", this.untilDate ? this.untilDate : "").subscribe(res => {
        if (res) {
          this.appService.setSpinner(false);
          this.detailsOfWorkingHourByEmployee = res;
          this.detailsOfWorkingHourByEmployee.forEach(x => {
            if (x.Date != null) {
              this.detailsOfWorkingHourByEmployeeToSend.push(x)
            }
          })
          this.detailsOfWorkingHourByEmployee.forEach((x: any) => {
            if (x.HoursReportedThisMonth != 0) {
              this.hoursReportedThisMonth = x.HoursReportedThisMonth;
            }
            if (x.WorkingDaysThisMonth != 0) {
              this.workingDaysThisMonth = x.WorkingDaysThisMonth;
            }
          });
          console.log(this.hoursReportedThisMonth);
          console.log(this.detailsOfWorkingHourByEmployeeToSend);

        }
      },
        err => {
          this.appService.setSpinner(false);
          console.log(err.error);
        })
    }
  }

  getReportsBySpesificDate(val: any) {
    this.spesificDate = this.datepipe.transform(val.Date, 'dd/MM/yyyy');
    this.spesificDateForCreateReport = val.Date;
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetMyProjectContectItem(this.systemGuid, 0, "", "", this.spesificDate).subscribe(res => {
      if (res) {
        this.reportsBySpesificDate = res;
        console.log(this.reportsBySpesificDate);
        this.popUpService.setSpecificPopUp(true, 'ProjectContentItemBySpesificDate');
        // this.projectContentItemGuid = ProjectContentItem.Guid;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.projectContentItemGuid = ProjectContentItem.Guid;
  }

  createReportWithDate(val: any) {
    this.dateToUpdate = val.Date;
    localStorage.setItem('dateToUpdate', this.dateToUpdate)
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, "createAprojectContentItem");
  }
  createReport() {
    localStorage.setItem('dateToUpdate', this.spesificDateForCreateReport)
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, "createAprojectContentItem");
  }
  sortByDateRange(dates: any) {
    this.detailsOfWorkingHourByEmployeeToSend = [];
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetDetailsOfWorkingHourByEmployee(this.systemGuid, 3, dates.fromDate, dates.untilDate).subscribe(res => {
      if (res) {
        this.detailsOfWorkingHourByEmployee = res;
        this.detailsOfWorkingHourByEmployee.forEach(x => {
          if (x.Date != null) {
            this.detailsOfWorkingHourByEmployeeToSend.push(x)
          }
        })
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
}