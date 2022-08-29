import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  systemGuid: any;
  interval: any;
  taskArr!: Task[];
  taskArrCopy: any;
  sortTaskArr: any;
  ifThereAreTasks = false;
  tableMyTaskOpen1 = false;
  tableMyTaskOpen = true;
  tableMyTaskTeamsOpen = false;
  taskTeamsArrCopy: any;
  taskTeamsArr: any;
  tableLastTaskIWorkedOn = false
  projectArr!: Project[];
  workTypeArr: any;
  projectContentItemArr: any;
  tableMyTaskTeamsOpen1 = false;
  projectContentItem: any;
  titleLastTaskIWorkedOn = "המשימות האחרונות שעבדתי עליהן";
  titleTableTeamsTask = 'המשימות של הצוותים אליהם אני שייך';
  titleTableTask = 'המשימות שלי';
  thArrTask = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  thArrTaskTeams = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'צוות'];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  tableSpecificTaskOpen = false;
  startWorkOfTask: any;
  taskListDataDetails: any;
  ifThereAreprojectContentItem = false;
  constructor(private popUpService: PopUpServiceService, private buttonWorkingTaskService: ButtonWorkingTaskService, private appService: AppService, private userService: UserServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.GetProject();
    this.GetWorkType();
    this.GetMyTask();
    this.GetTaskForMyTeams()
  }

  GetTaskForMyTeams() {
    this.systemGuid = localStorage.getItem('systemGuid');
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
  GetWorkType() {
    this.userService.GetWorkType().subscribe(
      (res: any) => {
        this.workTypeArr = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  WhichTableOpen(val: any) {
    this.ifThereAreTasks = false;
    if (val == 0) {
      this.tableMyTaskOpen = true;
      this.tableMyTaskTeamsOpen = false;
      this.tableLastTaskIWorkedOn = false;
    }
    if (val == 1) {
      this.tableMyTaskTeamsOpen = true;
      this.tableMyTaskOpen = false;
      this.tableLastTaskIWorkedOn = false;
    }
    if (val == 2) {
      this.SortLastTaskIWorkedOn();
      this.tableLastTaskIWorkedOn = true;
      this.tableMyTaskTeamsOpen = false;
      this.tableMyTaskOpen = false;
    }
  }

  SortLastTaskIWorkedOn() {
    this.sortTaskArr.sort((a: any, b: any) =>
      (a.ProjctContentItem ? a.ProjctContentItem['CreatedOn'] : 0) > (b.ProjctContentItem ? b.ProjctContentItem['CreatedOn'] : 0) ? 1 : -1
    )
  }
  whichButtonChoose(val: any) {
    this.buttonWorkingTaskService.setSpecificButton(val.kind, val.type);
  }
  SelectedTask(val: any) {
    if (!this.startWorkOfTask) {
      this.taskListDataDetails = val;
      localStorage.setItem('taskListDataDetails', JSON.stringify(this.taskListDataDetails))
      clearInterval(this.interval);
      this.GetProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
      this.tableSpecificTaskOpen = true;
      this.tableMyTaskOpen = false;
      this.tableMyTaskTeamsOpen = false;
      // this.tableLastTaskIWorkedOn = false;
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
  onSearchTask(filterKeyBySubject: any) {
    this.taskArr = [...this.taskArrCopy];
    if (filterKeyBySubject !== "" && filterKeyBySubject !== null && filterKeyBySubject !== undefined) {
      this.taskArr = this.taskArr.filter((f: Task) => f.Subject?.includes(filterKeyBySubject));
    }
    else {
      if (filterKeyBySubject == "" || filterKeyBySubject == null || filterKeyBySubject !== undefined) {
        this.taskArr = [...this.taskArrCopy];
      }
    }
  }
  onSearchProject(filterKey: any) {
    if (this.tableMyTaskOpen == true) {
      this.taskArr = [...this.taskArrCopy];
      if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
        this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey.Name));
      }
    }
    else
      if (this.tableMyTaskTeamsOpen == true) {
        this.taskTeamsArr = [...this.taskTeamsArrCopy]
        if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
          this.taskTeamsArr = this.taskTeamsArr.filter((f: Task) => f.Project?.Name.includes(filterKey));
        }
      }
      else {
        this.taskArr = [...this.taskArrCopy];
      }
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
        this.tableMyTaskOpen1 = false;

      }
    )
  }


  SelectedData(val: object) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
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
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
  }
}
