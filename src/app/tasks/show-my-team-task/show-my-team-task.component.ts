import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-show-my-team-task',
  templateUrl: './show-my-team-task.component.html',
  styleUrls: ['./show-my-team-task.component.css']
})
export class ShowMyTeamTaskComponent implements OnInit {
  project!: any;
  workType!: any;
  isPopUpOpen: any;
  tableMyTaskTeamsOpen = false;
  titleTableTeamsTask = 'המשימות של הצוותים אליהם אני שייך';
  thArrTaskTeams = ['שם המשימה', 'נוצר ב', 'פרוייקט', 'צוות'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  taskTeamsArr: any;
  systemGuid: any;
  taskTeamsArrCopy: any;
  projectContentItem: any;
  showMassgeToUser = false;
  projectContentItemGuid!: string;
  ifSortDown = true;
  constructor(private userService: UserServiceService,
    private popUpService: PopUpServiceService,
    public route: Router, private activatedRoute: ActivatedRoute) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.getTaskForMyTeams();
    this.GetProject();
    this.GetWorkType();
  }
  GetWorkType() {
    this.userService.GetWorkType().subscribe(
      (res: any) => {
        this.workType = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  GetProject() {
    this.userService.GetProject().subscribe(res => {
      if (res) {
        this.project = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  getTaskForMyTeams() {
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetTaskForMyTeams(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskTeamsArr = res;
          this.taskTeamsArrCopy = res;
        }
      }, err => {
        console.log(err.error)
      }
    )
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
      case 'צוות':
        keyToSort = ['OwnerId', 'Name'];
        break;
      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.taskTeamsArr?.sort((a: any, b: any) =>
        (a[keyToSort] ? a[keyToSort] : "" > (b[keyToSort] ? b[keyToSort] : "")) ? 1 : -1)
    }
    else {
      this.taskTeamsArr?.sort((a: any, b: any) =>
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
      case 'צוות':
        keyToSort = ['OwnerId', 'Name'];
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
    if (keyToSort[0] != 'Project' && keyToSort[0] != 'OwnerId') {
      this.taskTeamsArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.taskTeamsArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SelectedData(val: any) {
    this.route.navigate(['/menu/specific-task', val.TaskGuid])
  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-my-task', this.systemGuid]);
    }
    if (val == "") {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-team-my-task/', this.systemGuid]);
    }
    if (val == 2) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/the-last-tasks-i-worked', this.systemGuid]);
    }
  }
  getTaskAfterSort(task: any) {
    this.taskTeamsArr = task;
  }
}

