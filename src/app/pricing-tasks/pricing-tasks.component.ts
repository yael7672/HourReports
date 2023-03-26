import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { Project } from '../interfacees/project';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-pricing-tasks',
  templateUrl: './pricing-tasks.component.html',
  styleUrls: ['./pricing-tasks.component.css']
})
export class PricingTasksComponent implements OnInit {
  ifSortDown = true
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  @Input() nameSearch: any
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
  workType: any;
  projectContentItemArr: any;
  projectContentItem: any;
  titleTableTask = 'משימות לתמחור ';
  thArrTask2 = ['שם המשימה', 'נוצר ב', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  taskListKeys2 = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  thArrEvaluationToEstablishSystem = ['שם הערכת מאמץ'];
  EvaluationToEstablishSystemListKeys = ['evaluationToEstablishSystemName'];
  thArrQuoteCalculators = ['שם מחשבון הצעת מחיר '];
  QuoteCalculatorsListKeys = ['QuoteCalculatorsName'];
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
  ifThereNewTasks!: boolean
  MyNewTaskArr: any[] = [];
  openTasks!: any[];
  Status: any;
  project: any;
  ifShowSpinner!: boolean;
  noTask = false;
  titlePricingTask = "משימות לתמחור"
  evaluationsToEstablishSystem!: any[]
  PricingTask!: any[]
  quoteCalculators!: any[]
  EvaluationToEstablishDetails:any
  QuoteCalculatorsDetails: any;
  showPricingTask=false
   showQuoteCalculators=false
    showEvaluationsToEstablishSystem=true
  noEvaluationToEstablishSystem =false
  noQuoteCalculators=false
  constructor(private activatedRoute: ActivatedRoute, private popUpService: PopUpServiceService,
    private appService: AppService, private userService: UserServiceService, private route: Router) {

    this.appService.getSpinner().subscribe(res => {
      this.ifShowSpinner = res;
    })
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = localStorage.getItem('DateNow') ? true : false;
    }
    this.popUpService.getAllmyTask().subscribe(res => {
      if (res)
        this.GetTasksEffortEstimationQuoteCalculator()
    })
    this.popUpService.getAllMyNewTask().subscribe(res => {
      this.ifThereNewTasks = res ? res : false;
    })
    this.popUpService.getOpenTaskPopUp().subscribe(res => {
      this.openTasks = res;
      console.log(this.openTasks)
    })
  }
  ngOnInit(): void {
    this.GetProject()
    this.GetWorkType()
    this.GetTasksEffortEstimationQuoteCalculator()


  }

  GetTasksEffortEstimationQuoteCalculator() {
    debugger;
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetTasksEffortEstimationQuoteCalculator(this.systemGuid).subscribe(
      (res: any) => {
        if (res != null) {
          this.noEvaluationToEstablishSystem = true
          this.evaluationsToEstablishSystem = res[0].evaluationToEstablishSystem;
        }
      },
      (err: any) => {
        this.noEvaluationToEstablishSystem = true
        console.log(err.error)
      }

    )
  }
  GetQuoteCalculatorsByEvaluationToEstablishSystem(EvaluationToEstablishSystemGuid:any) {
    debugger;
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetQuoteCalculatorsByEvaluationToEstablishSystem(this.systemGuid,EvaluationToEstablishSystemGuid).subscribe(
      (res: any) => {
        if (res != null) {
          this.noQuoteCalculators = true
          this.quoteCalculators = res;
        }
      },
      (err: any) => {
        this.noQuoteCalculators = true
        console.log(err.error)
      }

    )
  }
  GetPricingTask(QuoteCalculatorsGuid:any) {
    debugger;
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.GetPricingTask(this.systemGuid,QuoteCalculatorsGuid).subscribe(
      (res: any) => {
        if (res != null) {
          this.noTask = true
          this.PricingTask = res;
        }
      },
      (err: any) => {
        this.noTask = true
        console.log(err.error)
      }

    )
  }
  // GetTasksEffortEstimationQuoteCalculator(SystemGuid: string) {
  // GetQuoteCalculatorsByEvaluationToEstablishSystem(SystemGuid: string,EvaluationToEstablishSystemGuid:any) {
  // GetPricingTask(SystemGuid: string,QuoteCalculatorsGuid:any) {
  GetWorkType() {
    this.userService.GetWorkType().subscribe(
      (res: any) => {
        this.workType = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  SelectedEvaluationToEstablish(val: any) {
    debugger
    if (!this.startWorkOfTask) {
      this.EvaluationToEstablishDetails = val;
      localStorage.setItem('EvaluationToEstablishDetails', JSON.stringify(this.EvaluationToEstablishDetails))
      clearInterval(this.interval);
      this.GetQuoteCalculatorsByEvaluationToEstablishSystem(this.EvaluationToEstablishDetails.evaluationToEstablishSystemGuid)
      this.showPricingTask=false
       this.showQuoteCalculators=true
        this.showEvaluationsToEstablishSystem=false      // this.getProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
      // this.route.navigate(['/menu/specific-task', val.TaskGuid])
    }
    else {
      swal("קיימת משימה פעילה")
    }

  }
  SelectedQuoteCalculators(val: any) {
    debugger
    if (!this.startWorkOfTask) {
      this.QuoteCalculatorsDetails = val;
      localStorage.setItem('QuoteCalculatorsDetails', JSON.stringify(this.QuoteCalculatorsDetails))
      clearInterval(this.interval);
      this.GetPricingTask(this.QuoteCalculatorsDetails.QuoteCalculatorsGuid)
      this.showPricingTask=true
      this.showQuoteCalculators=false
       this.showEvaluationsToEstablishSystem=false 

      // this.getProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
      // this.route.navigate(['/menu/specific-task', val.TaskGuid])
    }
    else {
      swal("קיימת משימה פעילה")
    }

  }
  SelectedTask(val: any) {
    debugger
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
    if (keyToSort[0] != 'EvaluationToEstablishSystemGuid') {
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
    if (keyToSort[0] != 'EvaluationToEstablishSystemGuid') {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.taskArr?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
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
  async getProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).then(
      res => {
        if (res.length > 0) {
          this.projectContentItemArr = res;
        }
      },
      err => {
        console.log(err.error); swal("error!", err.error, "error");
      })
  }
  GetProject() {
    this.userService.GetProject().subscribe(res => {
      if (res) {
        this.project = res;
      }
    },
      err => {
        console.log(err.error); swal("error!", err.error, "error");
      })
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
    if (val == 2) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/the-last-tasks-i-worked', this.systemGuid]);
    }
    if (val == "") {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/menu/pricing-tasks', this.systemGuid]);
    }
  }
  getTaskAfterSort(task: any) {
    this.sortTaskArr = task;
  }
}
