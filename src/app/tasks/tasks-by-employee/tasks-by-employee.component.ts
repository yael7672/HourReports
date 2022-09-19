import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopUpServiceService } from '../../pop-up-service.service';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-tasks-by-employee',
  templateUrl: './tasks-by-employee.component.html',
  styleUrls: ['./tasks-by-employee.component.css']
})
export class TasksByEmployeeComponent implements OnInit {


  titleTableTask: any;
  employeeDetails: any;
  employeeDetailsParseJson: any;
  systemGuid: any;
  taskArr: any;
  taskArrCopy: any;
  sortTaskArr: any;
  ifThereAreTasks = false;
  ifSortDown = false;
  thArrTask = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  projectContentItem: any;
  taskGuid: any;
  isPopUpOpen: any;
  workTypeArr: any;
  projectArr: any;
  tasksName: any;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserServiceService,
    private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.GetMyTask();
    this.GetProject();
    this.GetWorkType();
    this.employeeDetails = localStorage.getItem('employeeDetails');
    this.employeeDetailsParseJson = JSON.parse(this.employeeDetails);
    this.titleTableTask = this.titleTableTask = ' המשימות של ' + this.employeeDetailsParseJson?.EmployeeName;
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
  GetWorkType() {
    this.userService.GetWorkType().subscribe(
      (res: any) => {
        this.workTypeArr = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  GetMyTask() {
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskArr = res;
          this.taskArrCopy = res;
        }
      }, err => {
        console.log(err.error)
        this.ifThereAreTasks = true;
      }
    )
  }

  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(task: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteTask');
    this.tasksName = task.Subject;
    this.taskGuid = task.TaskGuid
    ;
  }
  editEmployeeDetailsByAdmin(task: any) {
    this.popUpService.setSpecificPopUp(true, 'EditEmployeeDetailsByAdmin');
    this.taskGuid = task.TaskGuid;
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
      case 'צוות':
        keyToSort = ['OwnerId', 'Name'];
        break;
      default:
        break;
    }
    if (keyToSort != 'Project') {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.taskArr?.sort((a: any, b: any) =>
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
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
}
