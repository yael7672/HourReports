import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-project-contect-items-by-employee',
  templateUrl: './project-contect-items-by-employee.component.html',
  styleUrls: ['./project-contect-items-by-employee.component.css']
})
export class ProjectContectItemsByEmployeeComponent implements OnInit {
  selectedTime: any;
  systemGuid: any;
  myProjectContectItemArr: any;
  workTypeArr: any;
  projectArr: any;
  projectContentItem: any;
  projectContentItemGuid: any;
  isPopUpOpen: any;
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  ifSortDown = false;
  employeeDetails: any;
  employeeDetailsParseJson: any;
  titleTable = "";
  massage: any;
  objectToSend: any;


  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService, private datePipe: DatePipe,
    private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    this.popUpService.getAllmyProjectContectItem().subscribe(res => {
      this.GetMyProjectContectItem(this.selectedTime)
    })
  }
  ngOnInit(): void {
    this.GetProject();
    this.GetWorkType();
    if (this.myProjectContectItemArr) {
      // this.sortTableByDate();
    }
    this.employeeDetails = localStorage.getItem('employeeDetails');
    this.employeeDetailsParseJson = JSON.parse(this.employeeDetails);
    this.titleTable = this.titleTable = ' הדיווחים של ' + this.employeeDetailsParseJson?.EmployeeName;
    this.GetMyProjectContectItem("6");
  }
  GetMyProjectContectItem(selectedTime: any, fromDate = "", untilDate = "") {
    this.selectedTime = selectedTime;
    if (selectedTime) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.GetMyProjectContectItem(this.systemGuid, selectedTime, fromDate, untilDate).subscribe(res => {
        if (res) {
          this.myProjectContectItemArr = res;
          console.log(this.myProjectContectItemArr);

        }
      },
        err => {
          console.log(err.error);
        })
    }
  }
  GetWorkType() {
    this.userService.GetWorkType().subscribe(
      (res: any) => {
        this.workTypeArr = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  GetProject() {
    this.userService.GetProject().subscribe(res => {
      if (res) {
        this.projectArr = res;
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
  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'משך':
        keyToSort = 'WorkingHours';
        break;
      case 'תאור':
        keyToSort = 'Description';
        break;
      case 'סוג עבודה':
        keyToSort = ['WorkType', 'Name'];
        break;
      case 'שם':
        keyToSort = 'Name';
        break;
      case 'שעות לחיוב?':
        keyToSort = 'BillableHours';
        break;
      default:
        break;
    }

    if (keyToSort[0] != 'WorkType') {
      this.myProjectContectItemArr.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.myProjectContectItemArr?.sort((a: any, b: any) =>

        (keyToSort[1] > (keyToSort[1])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;

    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'משך':
        keyToSort = 'WorkingHours';
        break;
      case 'תאור':
        keyToSort = 'Description';
        break;
      case 'סוג עבודה':
        keyToSort = ['WorkType', 'Name'];
        break;
      case 'שם':
        keyToSort = 'Name';
        break;
      case 'שעות לחיוב?':
        keyToSort = 'BillableHours';
        break;
      default:
        break;
    }
    // thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];

    if (keyToSort[0] != 'WorkType') {
      this.myProjectContectItemArr.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.myProjectContectItemArr?.sort((a: any, b: any) =>
        (keyToSort[1] < keyToSort[1]) ? 1 : -1)

    }
  }
  approveReport(val: any) {

    if (val.length >= 1) {
      this.objectToSend = {
        "OrganizationName": "AuroraProd",
        "ProjectItems": val
      }
    }
    else {
      this.objectToSend = {
        "OrganizationName": "AuroraProd",
        "ProjectItems": [val]
      }
    }
    console.log(this.objectToSend);

      this.userService.ApprovalPojectContentItem(this.objectToSend).subscribe(
        (res: any) => {
          this.massage = res;
          swal(this.massage)
        },
        (err: any) =>
          console.log(err.error)
      )
  }
}
