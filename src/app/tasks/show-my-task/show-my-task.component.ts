import { style } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { HtmlTagDefinition } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
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
  thArrTask = ['שם המשימה', 'נוצר ב', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  tableSpecificTaskOpen = false;
  startWorkOfTask = false;
  TasksGuid: any;
  showMassgeToUserDeleteTask = false;
  taskListDataDetails: any;
  UpdateProjectContentItemDetails = false;
  ifThereAreprojectContentItem = false;
  ifUpdateOpen = false;
  ifAdmin: any;
  employeeDetails: any;
  systemGuidFromLocalStorage: any;
  employeeDetailsParseJson: any;
  tasksGuid: any;
  tasksName: any;
  showAllProjects = false;
  showMyProjects = true;
  myProjectArr!: Project[]
  image!: any;
  ifThereNewTasks!:boolean
  MyNewTaskArr: any[]=[];
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  constructor(private activatedRoute: ActivatedRoute, private popUpService: PopUpServiceService,  
    private appService: AppService, private userService: UserServiceService, private route: Router,
    private swPush: SwPush) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = localStorage.getItem('DateNow')?true:false;
    }
    this.popUpService.getAllmyTask().subscribe(res => {
      if (res)
        this.GetMyTask()
    })
    this.popUpService.getAllMyNewTask().subscribe(res => {
      this.ifThereNewTasks = res ? res : false;
 
    })
  }
  ngOnInit(): void {
    this.GetMyNewTasks()
    // if (this.ifThereNewTasks = true) {
    //   this.notifyMeMyNewTask()
    // }
    this.GetProject();
    this.GetWorkType();
    this.GetMyTask();
    this.getMyProject();
    this.employeeDetails = localStorage.getItem('employeeDetails');
    this.employeeDetailsParseJson = JSON.parse(this.employeeDetails);
    this.ifAdmin = localStorage.getItem('ifAdmin');
    this.systemGuidFromLocalStorage = localStorage.getItem('systemGuid');
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    // this.requestSubscription();
    const subscription = {
      endpoint:
          '<CLIENT_ENDPOINT>',
      expirationTime: null,
      keys: {
          p256dh: '<CLIENT_P256DH>',
          auth: '<CLIENT_AUTH>',
      },
  };
  }
 
  GetMyNewTasks() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyNewTasks(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.MyNewTaskArr = res;
          console.log("משימות חדשות");
          
          console.log( this.MyNewTaskArr)
          this.MyNewTaskArr.sort((a: any, b: any) => {
            const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
            const sortValueTimestampB = this.toTimestamp(b.CreatedOn);
            debugger
            return (sortValueTimestampA > sortValueTimestampB ? 1 : -1) 
           })
          if (this.MyNewTaskArr.length <=0) {
            this.popUpService.setAllMyNewTask(true)
        
          }
          else {
            this.popUpService.setAllMyNewTask(false) 
               if (this.ifThereNewTasks = true) {
              this.notifyMeMyNewTask()
            }
          }
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  toTimestamp(sortValue: any) {
    var datum = Date.parse(sortValue);
    return datum / 1000;
  }

  notifyMeMyNewTask() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification("יש לך משימה/ות חדשה/ות !",{
        body:"שם המשימה: "+this.MyNewTaskArr[0]?.Subject,
        icon:'../../../assets/images/2387679.png'
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("יש לך משימה/ות חדשה/ות !",{
            body:"שם המשימה: "+this.MyNewTaskArr[0]?.Subject,
            icon:'../../../assets/images/2387679.png'
          });
        }
      });
    }
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

  // requestSubscription = () => {
  //   if (!this.swPush.isEnabled) {
  //     console.log("Notification is not enabled.");
  //     return;
  //   }

  //   this.swPush.requestSubscription({
  //     serverPublicKey: '<VAPID_PUBLIC_KEY_FROM_BACKEND>'
  //   }).then((_) => {
  //     console.log(JSON.stringify(_));
  //   }).catch((_) => console.log);
  // };
  // notifyMe() {

 

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
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
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
    if (keyToSort[0] != 'Project') {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
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
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
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

  DeleteTask(Task: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteTask');
    this.showMassgeToUserDeleteTask = true;
    this.tasksGuid = Task.TaskGuid;
    this.tasksName = Task.Subject;
    this.showMassgeToUserDeleteTask = true;
  }
  // מפה חיפוש ומיון
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-my-task', this.systemGuid]);
    }
    if (val == 1) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/show-team-my-task/', this.systemGuid]);
    }
    if (val == 2) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/the-last-tasks-i-worked',this.systemGuid]);
    }
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
    this.taskArr = [...this.taskArrCopy];
    if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
      this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey.Name));
    }
  }
  // עד לפה חיפוש ומיון
  SearchProjectOption(val: any) {
    if (val == "0") {
      this.showAllProjects = true
      this.showMyProjects = false
    }
    if (val == "1") {
      this.showMyProjects = true
      this.showAllProjects = false

    }
  }


  getMyProject() {
    this.userService.GetProjectsBySystemUser(this.systemGuid).subscribe(res => {
      if (res) {
        this.myProjectArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
}
