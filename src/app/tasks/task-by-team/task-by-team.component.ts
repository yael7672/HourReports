import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { PopUpServiceService } from '../../pop-up-service.service';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-task-by-team',
  templateUrl: './task-by-team.component.html',
  styleUrls: ['./task-by-team.component.css']
})
export class TaskByTeamComponent implements OnInit {
  project!: any;
  workType!: any;
  isPopUpOpen: any;
  tableMyTaskTeamsOpen = false;
  titleTableTeamsTask = "";
  thArrTaskTeams = ['שם המשימה', 'נוצר ב', 'פרוייקט', 'צוות'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  taskTeamsArr: any;
  teamGuid: any;
  taskTeamsArrCopy: any;
  projectContentItem: any;
  showMassgeToUser = false;
  projectContentItemGuid!: string;
  ifSortDown = true;
  teamDetails: any
  teamDetailsParseJson: any;
  constructor(private userService: UserServiceService,
    private popUpService: PopUpServiceService,
    public route: Router, private activatedRoute: ActivatedRoute) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.teamDetails = localStorage.getItem('teamsDetails');
    this.teamDetailsParseJson = JSON.parse(this.teamDetails);
    this.titleTableTeamsTask = ' המשימות של צוות ' + this.teamDetailsParseJson?.TeamName;
    this.GetTaskByTeamGuid();
    this.GetWorkType();
    this.GetProject();
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
        console.log(err.error);              swal("error!",err.error,"error");
      })
  }
  GetTaskByTeamGuid() {
    this.teamGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetTaskByTeamGuid(this.teamGuid).subscribe(
      res => {
        if (res) {
          this.taskTeamsArr = res;

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
}



