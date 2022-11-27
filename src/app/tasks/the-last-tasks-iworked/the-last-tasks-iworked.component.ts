import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-the-last-tasks-iworked',
  templateUrl: './the-last-tasks-iworked.component.html',
  styleUrls: ['./the-last-tasks-iworked.component.css']
})
export class TheLastTasksIWorkedComponent implements OnInit {
  systemGuid: any;
  taskTeamsArr: any;
  taskArr: any;
  interval: any;
  projectContentItemArr: any;
  UpdateTaskDetails: any;
  showMassgeToUserDeleteTask: any;
  tasksGuid: any;
  tasksName: any;
  isPopUpOpen: any;
  startWorkOfTask = false;
  taskListDataDetails: any;
  titleLastTaskIWorkedOn = "המשימות האחרונות שעבדתי עליהן";
  thArrTaskTeams = ['שם המשימה', 'נוצר ב', 'פרוייקט', 'צוות'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  sortTaskArr: any[] = [];
  projectContentItem: any;
  showMassgeToUser = false;
  projectContentItemGuid: any;
  ifSortDown = true;

  constructor(private popUpService: PopUpServiceService, private activatedRoute: ActivatedRoute, private appService: AppService, private userService: UserServiceService, public route: Router) {
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = localStorage.getItem('DateNow') ? true : false;
    }
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }

  ngOnInit(): void {
    this.GetMyTask();
  }
  GetMyTask() {
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskArr = res;
          this.sortTaskArr = res;
          this.SortLastTaskIWorkedOn()
          console.log(this.sortTaskArr);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
    this.UpdateTaskDetails = true;
  }

  DeleteTask(Task: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteTask');
    this.showMassgeToUserDeleteTask = true;
    this.tasksGuid = Task.TaskGuid;
    this.tasksName = Task.Subject;
    this.showMassgeToUserDeleteTask = true;
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
      this.sortTaskArr?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
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
    debugger
    this.sortTaskArr = this.sortTaskArr.sort((a: any, b: any) =>
      (a.ProjctContentItem ? a.ProjctContentItem[0].CreatedOn : 0) < (b.ProjctContentItem ? b.ProjctContentItem[0].CreatedOn : 0) ? 1 : -1
    )
  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-my-task', this.systemGuid]);
    }
    if (val == 1) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-team-my-task/', this.systemGuid]);
    }
    if (val == "") {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/the-last-tasks-i-worked', this.systemGuid]);
    }
  }
  getTaskAfterSort(task: any) {
    this.sortTaskArr = task;
  }
  SelectedTask(val: any) {
    
    if (!this.startWorkOfTask) {
      this.taskListDataDetails = val;
      localStorage.setItem('taskListDataDetails', JSON.stringify(this.taskListDataDetails))
      clearInterval(this.interval);
      this.getProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
      this.route.navigate(['/menu/specific-task', val.TaskGuid])
    }
    else {
      swal("קיימת משימה פעילה")
    }
  }
  async getProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).then(
      res => {
        if (res.length > 0) {
          this.projectContentItemArr = res;
        }
      },
      err => {
        console.log(err.error);
      })
  }
}
