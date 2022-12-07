import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { ProjectContentItem } from '../../interfacees/project-content-item';
import { PopUpServiceService } from '../../pop-up-service.service';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-project-content-item',
  templateUrl: './project-content-item.component.html',
  styleUrls: ['./project-content-item.component.css']
})
export class ProjectContentItemComponent implements OnInit {
  @Input() title!: string;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  titleTableProjectContentItemComponent = 'דיווחי שעות';
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectContentItemListKeys = ['Name', 'CreatedOn', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  workingHours!: Number;
  updateDetails = false;
  projectContentItem: any;
  openCard = false;
  openTable = true;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  projectContentItemGuid = "";
  showMassgeToUser = false;
  projectContentItemArr!: ProjectContentItem[];
  ifThereAreprojectContentItem = false;
  taskListDataDetails: any;
  taskListDataDetailsParseToJson: any;
  ifSortDown = false;
  workTypeArr: any;
  projectArr: any;
  constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    this.popUpService.GetProjectContentItemByTaskGuid().subscribe(res => {
      if (res) {
      this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
      this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails);
        this.GetProjectContentItemByTaskGuid(this.taskListDataDetailsParseToJson?.TaskGuid);
      }
    })
  }
  ngOnInit(): void {
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails)
    this.GetProject();
    this.GetWorkType();
    this.GetProjectContentItemByTaskGuid(this.taskListDataDetailsParseToJson.TaskGuid);
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
        console.log(err.error);              swal("error!",err.error,"error");
      })
  }
  async GetProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).then(
      res => {
        if (res.length > 0) {
          this.projectContentItemArr = res;
          this.ifThereAreprojectContentItem = true;
        }
        else
          this.ifThereAreprojectContentItem = false;
      },
      err => {
        console.log(err.error);              swal("error!",err.error,"error");
        this.ifThereAreprojectContentItem = false;
      })
  }
  toTimestamp(sortValue: any) {
    var datum = Date.parse(sortValue);
    return datum / 1000;
  }
  sortTableByDate() {
    this.tableData.sort((a: any, b: any) => {
      const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
      const sortValueTimestampB = this.toTimestamp(b.CreatedOn);
      return ((sortValueTimestampA ? sortValueTimestampA : "") < (sortValueTimestampB ? sortValueTimestampB : "") ? 1 : -1)
    })
  }
  returnColDataByType(colData: any, tableDataKey: any) {
    if (tableDataKey && typeof tableDataKey === 'string') {
      return colData[tableDataKey]
    }
    else {
      if (colData[tableDataKey[0]]) {
        return colData[tableDataKey[0]][tableDataKey[1]];
      }
      else return null;
    }
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(projectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = projectContentItem.Guid;
  }
  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'נוצר ב':
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
      this.projectContentItemArr?.sort((a: any, b: any) =>
        (a[keyToSort] ? a[keyToSort] : "" > (b[keyToSort] ? b[keyToSort] : "")) ? 1 : -1)
    }
    else {
      this.projectContentItemArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] > (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;
    let keyToSort: any;
    switch (thName) {
      case 'נוצר ב':
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
      this.projectContentItemArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.projectContentItemArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
}


