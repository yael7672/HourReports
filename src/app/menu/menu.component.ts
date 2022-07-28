import { jsDocComment, outputAst } from '@angular/compiler';
import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Project } from '../interfacees/project';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { Task } from '../interfacees/task';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TaskByGuid } from '../interfacees/TaskByGuid';
import { Chart } from 'chart.js';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { PauseWorkComponent } from '../pause-work/pause-work.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AttributeMarker } from '@angular/compiler/src/core';
import { MonthlyAndDailyWorkingHours } from '../interfacees/MonthlyAndDailyWorkingHours';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  a!: any;
  public model: any;
  isPopUpOpen!: any;
  taskListData: any;
  taskListDataDetails!: any;
  taskListDataDetails1: any;
  ifDescriptionPanel = false;
  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  workTime: any;
  titleLastTaskIWorkedOn = "המשימות האחרונות שעבדתי עליהן";
  titleTableTask = 'המשימות שלי';
  titleTableTeamsTask = 'המשימות של הצוותים אליהם אני שייך';
  titleTableProjectContentItemComponent = 'דיווחי שעות';
  titleCard = 'פרטי המשימה';
  thArrTask = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'שעות מוקצות למשימה', 'תאריך יעד', 'עדיפות'];
  thArrTaskTeams = ['שם המשימה', 'נוצר ב:', 'פרוייקט', 'צוות'];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], 'WorkingHours', 'ScheduledEndDate', 'PriorityCode'];
  taskTeamsListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'], ['OwnerId', 'Name']];
  projectContentItemListKeys = ['Name', 'CreatedOn', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  nameOfFunc = ['startTimer', 'pauseTimer', 'deleteTimer'];
  nameOfFunc1 = [];
  val = ['', 'worktime', 'worktime'];
  buttonName = ['התחל', 'השהה', 'השלם'];
  isDisabledKey = ['start', 'pouse', 'end'];
  arrFunc = [{ nameOfFunc: this.nameOfFunc }, { buttonName: this.buttonName }]
  isDisabledEnd = false;
  isDisabledPouse = false;
  isDisabledStart = false;
  isButtobChoose: any;
  massageFromServer!: string;
  isTaskAccomplished!: boolean;
  parseTime!: any;
  timetoSend: any;
  tableMyTaskTeamsOpen!: boolean;
  query = "";
  selectedOption = "";
  projectContentItemArr!: ProjectContentItem[]
  taskArrCopy!: Task[]
  taskArr!: Task[];
  sortTaskArr!: Task[];
  taskTeamsArr!: Task[];
  taskTeamsArrCopy!: Task[]
  tableSpecificTaskOpen = false;
  tableLastTaskIWorkedOn = false;
  tableMyTaskOpen = true;
  systemGuid: any;
  ifThereAreTasks = false;
  ifThereAreprojectContentItem = false;
  isSelected = false;
  hideButtonCancel = false
  hideProjectTh = false;
  projectArr!: Project[];
  projectArrName!: string[];
  showMassgeToUser = false;
  timeToSave: any;
  SystemGuid: any;
  arrSort!: Task[];
  massgeUserCloseTaskHeader = "?האם אתה בטוח שברצונך לצאת";
  massgeUseIfInTheMiddleOfWorkOnATaskHeader = "!יש לך משימה פתוחה";
  massgeUserIfInTheMiddleOfWorkOnATaskBody = "?האם ברצונך לחזור אליה";
  massgeUserRefreshWebsiteInMiddlePauseBody = "!שים לב";
  massgeUserRefreshWebsiteInMiddlePauseHeader = "היית באמצע הפסקה";
  massgeUserRefreshWebsiteInMiddlePauseFooter = "האם ברצונך לשוב לעבוד?";
  massgeUserCloseTaskBody = "!שים לב";
  massgeUserCloseTaskFooter = "פעולה זו סוגרת  את הטיימר של המשימה";
  massgeUserFinishtasklesstimeBody = "שעות העבודה על המשימה היו פחות ממשך הזמן שהוקצה לה!";
  massgeUserFinishtasklesstimeBody2 = " שעות עבודה לעומת שעות בפועל "
  massgeUserFinishtasklesstimeHeader = "כל הכבוד"
  textButtonBack = "חזרה למשימות שלי"
  TaskByGuidObject!: TaskByGuid;
  openPersonalDetails = false;
  taskGuidFromLocalStorage: any;
  taskNameFromLocalStorage: any;
  kindOfMassageIsifCloseTask = 'kindOfMassageIsifCloseTask';
  kindOfMassageUserFinishtasklesstime = 'kindOfMassageUserFinishtasklesstime'
  kindOfMassageifInTheMiddleOfWorkOnATask = 'kindOfMassageifInTheMiddleOfWorkOnATask';
  kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause = 'kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause'
  kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite = 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite'
  showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
  workTimeFromLocalStorage!: any;
  showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false;
  showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = false;
  showMassgeToUseMIfFinishtasklesstime = false;
  massgeUserIfInTheMiddleOfWorkOnATaskAndOpenPauseHeader = "את/ה באמצע עבודה על משימה"
  massgeUserIfInTheMiddleOfWorkOnATaskAndOpenPauseBody = "האם ברצונך לצאת להפסקה?"
  taskNameFromLocalStorage2: any;
  b!: any;
  endButton!: boolean;
  workTimeHour: any
  workTimeHourLS: any;
  workTimeHourLSJ: any;
  ab: any;
  IftaskForTeam!: boolean;
  tableMyTaskTeamsOpen1 = true;
  showstatiSticsGraph = false;
  tableMyTaskOpen1 = true;
  taskListDataDetailsFromLocalStoeage: any;
  taskListDataDetailsFromLocalStoeageParse: any;
  bdikatoDeleteActual: any = "2"
  bdikatoDelete1: any = "2"
  ifButtonFalse !: boolean;
  ifButtonTrue: boolean = true;
  MyProjectContectItemArr!: ProjectContentItem[]
  openMyProjectContectItem = false
  showMassegeNoProjectContectItem = false;
  projectContectItemGuid = "";
  ProjectContentItemCreatedDate!: any;
  Time: any;
  ifInTheMiddleOfABreak: any;
  projectContectItemGuidForLoclStorage: any;
  isgetAllTask: any;
  TaskGuidFromLS: any
  IfStartPouse!: boolean;
  IfClosePouse!: boolean;
  workTypeArr: any;
  todayDate: any;
  myDate = new Date()
  DailyAndMonthlyWorkingHours!: MonthlyAndDailyWorkingHours;
  constructor(public router: Router,
    private popUpService: PopUpServiceService,
    private userService: UserServiceService,
    private elementRef: ElementRef,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService, private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
    })
    this.popUpService.getAllmyTask().subscribe(res => {
      this.isgetAllTask = res
      this.GetMyTask()
    })
    this.popUpService.getAllmyProjectContectItem().subscribe(res => {
      this.GetMyProjectContectItem(1)
    })
    this.popUpService.GetWorkTimeAfterProjectContectItem().subscribe(res => {
      this.GetDailyWorkingHoursAndMonthlyWorkingHours()
    })
    this.popUpService.GetProjectContentItemByTaskGuid().subscribe(res => {
      this.TaskGuidFromLS = localStorage.getItem("TaskGuidOfProjectContectItem")
      this.GetProjectContentItemByTaskGuid(this.TaskGuidFromLS)
    })
    this.appService.getIsSelectedTask().subscribe(res => {
      this.descriptionPanel = res;
    })
    this.appService.getIsDescriptionPanelOpen().subscribe(res => {
      this.ifDescriptionPanel = res;
    })
    this.buttonWorkingTaskService.getKindOfButton().subscribe(res => {
      this.isButtobChoose = res;
      this.isDisabledPouse = true;

      if (this.isButtobChoose?.start) {
        this.isDisabledStart = true;
        this.isDisabledPouse = false;

      }
      if (this.isButtobChoose?.end) {
        this.isDisabledStart = true;
        this.isDisabledEnd = true;
        this.isDisabledPouse = true;
      }
      if (this.isButtobChoose?.chooseAnotherTask) {
        this.isDisabledStart = false;
        this.isDisabledEnd = false;
        this.isDisabledPouse = true;
        this.workTime = "";
        this.seconds = 0;
      }
      console.log(this.isButtobChoose);
    })
    if (localStorage.getItem("endButton") == "true") { this.endButton = true }
    if (localStorage.getItem("endButton") == "false") { this.endButton = false }
    this.popUpService.GetIfStartPouse().subscribe(res => {
      if (res) {
        this.showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = true;
      }
    })
  }
  ngOnInit(): void {
    this.GetWorkType()
    console.log(this.arrFunc);
    this.GetMyTask();
    this.GetDailyWorkingHoursAndMonthlyWorkingHours()
    this.GetProject();
    this.GetTaskForMyTeams();
    this.systemGuid = localStorage.getItem('systemGuid');
    this.GetMyProjectContectItem("2")
    this.CheckWhetherInTheMiddleOfWorkOnaTask();

    if (localStorage.getItem("DateNowPause")) {
      this.openPopUp('pause', true)
    }
    if (localStorage.getItem('DateNow')) {
      this.ContinueToWorkOnATask();
    }
  }

  GetTaskForMyTeams() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetTaskForMyTeams(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskTeamsArr = res;
          this.taskTeamsArrCopy = res;
          console.log(this.taskTeamsArr);
        }
      }, err => {
        console.log(err.error)

      }
    )
  }
  closePersonalDetails()
   {
    this.openPersonalDetails = false;
  }
   GetMyTask() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskArr = res;
          this.taskArrCopy = res;

          this.sortTaskArr = res
          console.log(this.taskArr);
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
        console.log(this.workTypeArr);
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  GetDailyWorkingHoursAndMonthlyWorkingHours() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.DailyAndMonthlyWorkingHours = res;
          console.log(this.taskArr);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  openPopUp(data: string, type: boolean) {
    if (data == 'pause') {
      if (localStorage.getItem('TaskGuid')) {
        this.taskNameFromLocalStorage2 = "שם המשימה:" + localStorage.getItem('TaskName')
        this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = true
      }
      else {
        this.appService.setIsPopUpOpen(true);
        this.popUpService.setSpecificPopUp(type, data)
      }
    }
    else {
      if (data == 'MyprojectContentItem') {
        this.openMyProjectContectItem = true
        // this.appService.setIsPopUpOpen(true);
        // this.popUpService.setSpecificPopUp(type, data)
      }
      else {
        this.appService.setIsPopUpOpen(true);
        this.popUpService.setSpecificPopUp(type, data)
      }
    }
  }
  SelectedTask(val: any) {
    this.taskListDataDetails = val;
    localStorage.setItem('taskListDataDetails', JSON.stringify(this.taskListDataDetails))
    console.log(this.taskListDataDetails);
    clearInterval(this.interval);
    this.GetProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
    this.tableSpecificTaskOpen = true;


    this.tableMyTaskOpen = false;
    this.tableMyTaskTeamsOpen = false;
    this.tableLastTaskIWorkedOn = false;
  }
  SelectedStart() {
    localStorage.setItem('TaskGuid', this.taskListDataDetails.TaskGuid);
    localStorage.setItem('TaskGuidToSend', this.taskListDataDetails.TaskGuid);
    localStorage.setItem('TaskName', this.taskListDataDetails.Subject);
    localStorage.setItem('TaskGuidOfProjectContectItem', this.taskListDataDetails.TaskGuid);
    this.systemGuid = localStorage.getItem('systemGuid');
    if (this.taskListDataDetails.OwnerId.Guid == this.systemGuid.toLowerCase()) {
      this.IftaskForTeam = false;
    }
    else {
      this.IftaskForTeam = true;
    }
    this.userService.CreateProjectContentItemByTaskGuid(this.systemGuid, this.taskListDataDetails.TaskGuid, this.IftaskForTeam).subscribe(res => {
      if (res) {
        this.projectContectItemGuid = res;
        localStorage.setItem("projectContectItemGuid", this.projectContectItemGuid);
        let a = Date.now();
        localStorage.setItem("DateNow", a.toString());
        this.ContinueToWorkOnATask();
        this.massageFromServer = res;
        this.popUpService.SetProjectContentItemByTaskGuid(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)

      }
    }, err => {
      console.log(err.error);
    })

  }



  SelectedStop(time: any) {
    localStorage.removeItem('TaskGuid');
    localStorage.removeItem('TaskName');
    localStorage.getItem('TaskGuidToSend');
    localStorage.removeItem("DateNow")
    if (time.worktime != "" || time != null) {
      this.timetoSend = time.worktime ? time.worktime.split(':') : time.split(':')

      clearInterval(this.interval);
      // this.seconds = 0;
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1]++;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
      this.isDisabledStart = false;
      this.isTaskAccomplished = false;
      if (this.parseTime == undefined) {
        this.parseTime = "";
      }
      this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid ? this.taskListDataDetails.TaskGuid : localStorage.getItem('TaskGuidToSend'), this.isTaskAccomplished, time.descriptionTask ? time.descriptionTask : "").subscribe(
        res => {
          if (res) {
            this.massageFromServer = res;
            swal(this.massageFromServer);
            this.workTime = ["00:00:00"];
            this.popUpService.SetProjectContentItemByTaskGuid(true)
            this.popUpService.SetWorkTimeAfterProjectContectItem(true)
          }
        },
        err => {
          console.log(err.error);
        }
      )
    }
  }
  SelectedEnd(time: any) {
    localStorage.removeItem('TaskGuid');
    localStorage.removeItem('TaskGuidTosend');
    localStorage.removeItem('TaskName');

    localStorage.removeItem("DateNow")

    if (time.worktime != "00:00:00" && time.worktime != "") {
      this.timetoSend = time.worktime.split(':');
      clearInterval(this.interval);
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = Number(this.timetoSend[0]) + this.timetoSend[1];
    }
    this.isTaskAccomplished = true;
    if (time.descriptionTask == undefined) {
      time.descriptionTask = "";
    }
    if (this.parseTime == undefined) {
      this.parseTime = "";
    }
    this.workTime = ["00:00:00"];

    this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid, this.isTaskAccomplished, time.descriptionTask).subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          this.tableMyTaskOpen = true;
          this.tableSpecificTaskOpen = false;

          this.AlertIfActualHoursLessThanAllottedHours(this.taskListDataDetails.TaskGuid, this.parseTime, this.massageFromServer)
          this.popUpService.setAllmyTask(true)
          this.popUpService.SetProjectContentItemByTaskGuid(true)
          this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }
  AlertIfActualHoursLessThanAllottedHours(TaskGuid: any, parseTime: any, massageFromServerUpdate: any) {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetActualTaskHours(this.systemGuid, TaskGuid).subscribe(
      res => {
        if (res) {
          this.TaskByGuidObject = res;
          console.log("this.TaskByGuidObject", this.TaskByGuidObject);
          if (this.TaskByGuidObject.WorkingHours == "0") {
            swal(massageFromServerUpdate)
          }
          else
            if (this.TaskByGuidObject.WorkingHours > this.TaskByGuidObject.ActualTime) {
              this.ifButtonFalse = false
              this.showMassgeToUseMIfFinishtasklesstime = true
              setTimeout(() => {
                this.ifButtonFalse = false
                this.showMassgeToUseMIfFinishtasklesstime = false
              }, 2000)
            }
            else {
              swal(massageFromServerUpdate)
            }
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }

  whichButtonChoose(val: any) {
    this.buttonWorkingTaskService.setSpecificButton(val.kind, val.type);
  }
  async GetProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).then(
      res => {
        if (res.length > 0) {
          this.projectContentItemArr = res;
          this.ifThereAreprojectContentItem = true;

          console.log(this.projectContentItemArr);
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
        this.projectArrName = this.projectArr.map(project => project.Name);
        console.log(this.projectArr);
      }
    },
      err => {
        console.log(err.error);
      })
  }
  // onSearchProject(filterKey = "") {
  //   console.log(filterKey);
  //   this.taskArr = [...this.taskArrCopy];
  //   this.projectArrName = this.projectArr.map(project => project.Name);
  //   if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
  //     this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey));
  //   }
  //   else {
  //     this.taskArr = [...this.taskArrCopy];
  //   }
  // }
  onSearchProject(filterKey: any) {
    console.log(filterKey);
    if (this.tableMyTaskOpen == true) {
      this.taskArr = [...this.taskArrCopy];
      if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
        this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey));
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
  clickCloseCard() {
    if (this.workTime == "00:00:00" || this.workTime == "") {
      this.tableMyTaskOpen = true;
      this.tableSpecificTaskOpen = false;

    }
    else {
      this.showMassgeToUser = true;
    }
  }
  clickYes(kindOfMassage: string) {
    if (kindOfMassage == 'kindOfMassageIsifCloseTask') {
      this.tableMyTaskOpen = true;
      this.tableSpecificTaskOpen = false;


      this.showMassgeToUser = false;
      this.SelectedStop(this.workTime)
    }
    if (kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATask') {
      this.GetProjectContentItemByTaskGuid(this.taskGuidFromLocalStorage)
      this.showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
      this.tableMyTaskOpen = false;
      this.isDisabledStart = true;
      this.isDisabledPouse = false;
      this.taskListDataDetailsFromLocalStoeage = localStorage.getItem('taskListDataDetails')
      this.taskListDataDetailsFromLocalStoeageParse = JSON.parse(this.taskListDataDetailsFromLocalStoeage)
      this.taskListDataDetails = this.taskListDataDetailsFromLocalStoeageParse;
      this.tableSpecificTaskOpen = true;
    }
    if (kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause') {
      this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false
      this.SelectedStop(this.workTime)
      this.openPopUp('pause', true)
      if (localStorage.getItem("endButton") == "false") {
        this.endButton = false
        localStorage.setItem("endButton", String(this.endButton))
      }
      if (localStorage.getItem("endButton") == "true") {
        this.endButton = true
        localStorage.setItem("endButton", String(this.endButton))
      }
    }
    // if (kindOfMassage == 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite') {
    //   let myCompPause = new PauseWorkComponent(this.datePipe, this.userService, this.elementRef ,this.router,this.appService, this.popUpService, this.buttonWorkingTaskService)
    //   myCompPause.clickYes(localStorage.getItem('WorkTimePause'))

    //   this.showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = false
    // }


  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage == 'kindOfMassageIsifCloseTask') {
      this.showMassgeToUser = false;
      this.tableMyTaskOpen = false;
      this.tableSpecificTaskOpen = true;
    }
    else {
      if (kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATask') {
        this.showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
        this.tableMyTaskOpen = true;

      }
      else {
        if (kindOfMassage == 'kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause') {
          this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false

        }
        else {
          if (kindOfMassage == 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite') {

            this.showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = false
            this.openPopUp('pause', true)
          }
        }
      }
    }
  }
  mouseLeavePersonalDetails() {
  } @HostListener("document:click")
  clickedOut() {


  }
  mouseOvePersonalDetails() {
    this.openPersonalDetails = true;

  }
  // formatter = (result: any) => result.Name;
  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term === '' ? []
  //       : this.projectArrName.filter((project: string) => project.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))
  BackToMyTask() {
    this.tableMyTaskOpen = true;
    this.tableSpecificTaskOpen = false;
  }
  CheckWhetherInTheMiddleOfWorkOnaTask() {
    if (localStorage.getItem('TaskGuid')) {
      this.taskGuidFromLocalStorage = localStorage.getItem('TaskGuid')
      this.taskNameFromLocalStorage = localStorage.getItem('TaskName')
      this.clickYes("kindOfMassageifInTheMiddleOfWorkOnATask")
    }
  }
  ContinueToWorkOnATask() {
    this.getCreatedProjectContentItemFromLoaclStorage();
    this.interval = setInterval(() => {
      if (this.workTime) {
        this.getCreatedProjectContentItemFromLoaclStorage();
      }
    }, 1000)
  }
  WhichTableOpen(val: any) {
    this.ifThereAreTasks = false;
    if (val == 0) {
      this.tableMyTaskOpen = true;
      this.tableMyTaskTeamsOpen = false;
      this.tableLastTaskIWorkedOn = false;
      if (this.taskArr == null || this.taskArr == undefined) {
        this.ifThereAreTasks = true;
        this.tableMyTaskOpen1 = false;
      }
    }
    if (val == 1) {
      this.tableMyTaskTeamsOpen = true;
      this.tableLastTaskIWorkedOn = false;
      this.tableMyTaskOpen = false;
      if (this.taskTeamsArr == null || this.taskTeamsArr == undefined || this.taskTeamsArr.length == 0) {
        this.ifThereAreTasks = true;
        this.tableMyTaskTeamsOpen1 = false;
      }
    }
    if (val == 2) {
      this.SortLastTaskIWorkedOn();
      this.tableLastTaskIWorkedOn = true;
      this.tableMyTaskTeamsOpen = false;
      this.tableMyTaskOpen = false;
      if (this.taskTeamsArr == null || this.taskTeamsArr == undefined || this.taskTeamsArr.length == 0) {
        this.ifThereAreTasks = true;
        this.tableMyTaskTeamsOpen1 = false;
      }
    }
  }
  GoToStatisticsGraph() {
    if (!this.tableSpecificTaskOpen) {
      this.showstatiSticsGraph = true;
      this.tableMyTaskOpen = false;
      this.tableMyTaskTeamsOpen = false;
      this.ifThereAreTasks = false;
      this.openMyProjectContectItem = false;
    }
  }
  GoToHome() {
    this.showstatiSticsGraph = false;
    this.openMyProjectContectItem = false;
    this.tableMyTaskOpen = true;
    this.tableSpecificTaskOpen = false;

  }
  ClickPersonalDetails() {
    this.openPersonalDetails = true;

  }
  Logout() {
    localStorage.clear();
    swal("!התנתקת בהצלחה")
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 1000)
  }

  SortLastTaskIWorkedOn() {
    this.sortTaskArr.sort((a: any, b: any) =>
      (a.ProjctContentItem ? a.ProjctContentItem['CreatedOn'] : 0) > (b.ProjctContentItem ? b.ProjctContentItem['CreatedOn'] : 0) ? 1 : -1
    )
  }

  GetMyProjectContectItem(selectedTime: any) {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.userService.GetMyProjectContectItem(this.systemGuid, selectedTime).subscribe(res => {
      if (res) {
        this.MyProjectContectItemArr = res;
        this.showMassegeNoProjectContectItem = false
        if (this.MyProjectContectItemArr.length == 0) {
          this.showMassegeNoProjectContectItem = true
        }
        console.log("MyProjectContectItemArr" + this.MyProjectContectItemArr);
      }
    },
      err => {
        console.log(err.error);
      })
  }
  GetProjectContentItemByGuid() {
    this.userService.GetProjectContentItemByGuid(this.projectContectItemGuidForLoclStorage).subscribe(res => {
      if (res) {
        this.setWorkTime(new Date(res.CreatedOn))
      }
    })
  }
  getCreatedProjectContentItemFromLoaclStorage() {
    if (localStorage.getItem('DateNow')) {
      this.setWorkTime(localStorage.getItem('DateNow'))
    }
  }
  convertTimeStempToTime(ProjectContentItemCreatedDate: any) {
    var timestampCreatOn = ProjectContentItemCreatedDate;
    const timestampNow = Date.now();
    console.log(timestampNow);
    console.log(timestampCreatOn);
    this.Time = timestampNow - timestampCreatOn;
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");

  }
  setWorkTime(res: any) {
    this.workTime = this.convertTimeStempToTime(res)
    console.log(this.workTime);
  }



  ClickedOut(event: any) {
    var v = event.target.closesttt
    this.openPersonalDetails = false;

  }



}