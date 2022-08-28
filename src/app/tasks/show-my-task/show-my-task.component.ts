import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-show-my-task',
  templateUrl: './show-my-task.component.html',
  styleUrls: ['./show-my-task.component.css']
})
export class ShowMyTaskComponent implements OnInit {
  @Input() hideProjectTh!: Boolean;
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() project!: any;
  @Input() workType!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  @Input() nameSearch: any
  IftableDataKeyIdProject!: boolean;
  ifSortDown = true;
  ProjectContentItem: any;
  showMassgeToUser: boolean = false;
  projectContentItemGuid: any;
  isPopUpOpen: any;
  taskDateRecords: any;
  constructor(private popUpService: PopUpServiceService, private appService: AppService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
    })
  }
  ngOnInit(): void {
  }
  
  SelectedData(val: object) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
    })
    if (!this.isPopUpOpen?.UpdateProjectContentItemDetails) {
      this.taskDateRecords = val;
      this.clickSelectedTask.emit(this.taskDateRecords)
    }
  }
  clickOfButton(kindOfButton: string, type: boolean) {
    this.getDataClickOfButton.emit({ "kind": kindOfButton, "type": type })
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
  SortTableDown(thName: any) {
    this.ifSortDown = false;
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
    if (keyToSort[0] != 'Project') {
      this.tableData.sort((a: any, b: any) =>
        (a[keyToSort] ? a[keyToSort] : "" > (b[keyToSort] ? b[keyToSort] : "")) ? 1 : -1)
    }
    else {
      this.tableData?.sort((a: any, b: any) =>
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
    if (keyToSort[0] != 'Project') {
      this.tableData.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.tableData?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  EditProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.ProjectContentItem = val;
    console.log(val);
  }
  DeleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = this.tableData.Guid;
  }
  openPopUp(data: string, type: boolean) {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(type, data)
  }
}
