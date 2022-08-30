import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { Project } from 'src/app/interfacees/project';
import { Task } from 'src/app/interfacees/task';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-show-my-task',
  templateUrl: './show-my-task.component.html',
  styleUrls: ['./show-my-task.component.css']
})
export class ShowMyTaskComponent implements OnInit {
  @Input() project!: any;
  @Input() workType!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  @Input() nameSearch: any
  ifSortDown = true;
  showMassgeToUser = false;
  projectContentItemGuid: any;
  isPopUpOpen: any;
  taskDateRecords: any;
  systemGuid: any;
  interval: any;
  taskArr!: Task[];
  taskArrCopy: any;
  sortTaskArr: any;
  ifThereAreTasks = false;
  tableMyTaskOpen = true;
  projectArr!: Project[];
  workTypeArr: any;
  projectContentItemArr: any;
  projectContentItem: any;
  titleTableTask = 'המשימות שלי';
  thArrTask = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  tableSpecificTaskOpen = false;
  startWorkOfTask = false;;
  taskListDataDetails: any;
  UpdateProjectContentItemDetails = false;
  ifThereAreprojectContentItem = false;
  ifUpdateOpen = false;
  constructor(private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService, private appService: AppService, private userService: UserServiceService, public route: Router) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.GetProject();
    this.GetWorkType();
    this.GetMyTask();
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
  SelectedTask(val: any) {
    if (!this.startWorkOfTask) {
      this.taskListDataDetails = val;
      localStorage.setItem('taskListDataDetails', JSON.stringify(this.taskListDataDetails))
      clearInterval(this.interval);
      this.GetProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
      this.route.navigate(['/specific-task', val.TaskGuid])
    }
    else {
      swal("קיימת משימה פעילה")
    }
  }
  async GetProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).then(
      res => {
        if (res.length > 0) {
          this.projectContentItemArr = res;
          this.ifThereAreprojectContentItem = true;
        }
        else {
          this.ifThereAreprojectContentItem = false;
        }
      },
      err => {
        console.log(err.error);
        this.ifThereAreprojectContentItem = false;
      })
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
  GetMyTask() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskArr = res;
          this.taskArrCopy = res;
          this.sortTaskArr = res
        }
      }, err => {
        console.log(err.error)
        this.ifThereAreTasks = true;
      }
    )
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
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] ? a[keyToSort] : "" > (b[keyToSort] ? b[keyToSort] : "")) ? 1 : -1)
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
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  openPopUp(data: string, type: boolean) {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(type, data)
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
    this.UpdateProjectContentItemDetails = true;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
  }
}
