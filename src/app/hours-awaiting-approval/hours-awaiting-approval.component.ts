import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-hours-awaiting-approval',
  templateUrl: './hours-awaiting-approval.component.html',
  styleUrls: ['./hours-awaiting-approval.component.css']
})
export class HoursAwaitingApprovalComponent implements OnInit {
  isPopUpOpen!: any;
  systemGuid: any;
  projectContentItemGuid: any;
  projectContentItem: any;
  showMassgeToUser: any;
  hoursAwaitingApprovalArr: any;
<<<<<<< HEAD
  deleteProjectContentItem: any;
=======
>>>>>>> new
  updateProjectContentItemDetails = false
  projectContentItemListKeys = ['Name', 'Date', 'ManagerNotes', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'הערות מנהל', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectArr: any;
  workTypeArr: any;
  ifSortDown = false;;

  constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
    })
  }
  ngOnInit(): void {
    this.GetHoursAwaitingApproval();
    this.GetWorkType();
    this.GetProject();

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
  GetHoursAwaitingApproval() {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.userService.GetHoursAwaitingApproval(this.systemGuid).subscribe(res => {
      if (res) {
        this.hoursAwaitingApprovalArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.updateProjectContentItemDetails = true;
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
    this.deleteProjectContentItem = true;
  }
  SortTableDown(thNameAndData: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thNameAndData.th) {
      case 'נוצר ב:':
        keyToSort = 'CreatedOn';
        break;
      case 'שעות מוקצות למשימה':
        keyToSort = 'WorkingHours';
        break;
      case 'תאריך יעד':
        keyToSort = 'ScheduledEndDate';
        break;
      case 'פרוייקט':
        keyToSort = ['Project', 'Name'];
        break;
      case 'שם המשימה':
        keyToSort = 'Subject';
        break;
      case 'עדיפות':
        keyToSort = 'PriorityCode';
        break;
      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.hoursAwaitingApprovalArr?.sort((a: any, b: any) =>
        (a[keyToSort] ? a[keyToSort] : "" > (b[keyToSort] ? b[keyToSort] : "")) ? 1 : -1)
    }
    else {
      this.hoursAwaitingApprovalArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] > (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;
    let keyToSort: any;
    switch (thName) {
      case 'נוצר ב:':
        keyToSort = 'CreatedOn';
        break;
      case 'שעות מוקצות למשימה':
        keyToSort = 'WorkingHours';
        break;
      case 'תאריך יעד':
        keyToSort = 'ScheduledEndDate';
        break;
      case 'פרוייקט':
        keyToSort = ['Project', 'Name'];
        break;
      case 'שם המשימה':
        keyToSort = 'Subject';
        break;
      case 'עדיפות':
        keyToSort = 'PriorityCode';
        break;
      default:
        break;
    }
    if (keyToSort!= 'Project') {
      this.hoursAwaitingApprovalArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.hoursAwaitingApprovalArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
}
