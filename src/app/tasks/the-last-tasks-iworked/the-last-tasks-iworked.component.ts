import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-the-last-tasks-iworked',
  templateUrl: './the-last-tasks-iworked.component.html',
  styleUrls: ['./the-last-tasks-iworked.component.css']
})
export class TheLastTasksIWorkedComponent implements OnInit {

  constructor(private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService, private appService: AppService, private userService: UserServiceService, public route: Router) { }

  titleLastTaskIWorkedOn = "המשימות האחרונות שעבדתי עליהן";
  thArrTaskTeams = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'צוות'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  sortTaskArr!: any;
  projectContentItem: any;
  showMassgeToUser = false;
  projectContentItemGuid: any;
  ifSortDown = true;
  ngOnInit(): void {
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
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
    if (keyToSort != 'Project') {
      this.sortTaskArr?.sort((a: any, b: any) =>
        (a[keyToSort]  > (b[keyToSort] )) ? 1 : -1)
    }
    else {
      this.sortTaskArr?.sort((a: any, b: any) =>
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
      this.sortTaskArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.sortTaskArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortLastTaskIWorkedOn() {
    this.sortTaskArr.sort((a: any, b: any) =>
    (a.ProjctContentItem ? a.ProjctContentItem['CreatedOn'] : 0) > (b.ProjctContentItem ? b.ProjctContentItem['CreatedOn'] : 0) ? 1 : -1
  )
  }
}
