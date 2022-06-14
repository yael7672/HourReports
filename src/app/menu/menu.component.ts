import { jsDocComment, outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
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
  titleTableTask = 'המשימות שלי';
  titleTableProjectContentItemComponent = 'דיווחי שעות';
  titleCard = 'פרטי המשימה';
  thArrTask = ['שם המשימה', 'נוצר ב:', 'פרוייקט'];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name']];
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
  query = "";
  selectedOption = "";
  projectContentItemArr!: ProjectContentItem[]
  taskArrCopy!: Task[]
  taskArr!: Task[];
  tableSpecificTaskOpen = false;
  tableMyTaskOpen = true;
  systemGuid: any;
  ifThereAreTasks = true;
  ifThereAreprojectContentItem = false;
  isSelected = false;
  hideButtonCancel = false
  hideProjectTh = false;
  projectArr!: Project[];
  projectArrName!: string[];
  showMassgeToUser = false;
  timeToSave: any;
  SystemGuid: any;
  massgeUserCloseTaskHeader = "?האם אתה בטוח שברצונך לצאת";
  massgeUseIfInTheMiddleOfWorkOnATaskHeader = "!יש לך משימה פתוחה";
  massgeUserIfInTheMiddleOfWorkOnATaskBody = "?האם בצונך לחזור אליה";
  massgeUserCloseTaskBody = "!שים לב";
  massgeUserCloseTaskFooter = "פעולה זו סוגרת  את הטיימר של המשימה";
  textButtonBack = "חזרה למשימות שלי"
  TaskByGuidObject!: TaskByGuid;
  openPersonalDetails = false;
  taskGuidFromLocalStorage: any;
  taskNameFromLocalStorage: any;
  kindOfMassageIsifCloseTask = 'kindOfMassageIsifCloseTask';
  kindOfMassageifInTheMiddleOfWorkOnATask = 'kindOfMassageifInTheMiddleOfWorkOnATask';
  showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
  workTimeFromLocalStorage!: any;
  arr1!: null | string;
  a: any;

  constructor(private popUpService: PopUpServiceService,
    private userService: UserServiceService,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
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
  }
  ngOnInit(): void {
    console.log(this.arrFunc);
    this.GetMyTask();
    this.GetProject();
    this.CheckWhetherInTheMiddleOfWorkOnaTask();
  }


  GetMyTask() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.taskArr = res;
          this.taskArrCopy = res;
          this.ifThereAreTasks = true;
          console.log(this.taskArr);
        }
      }, err => {
        console.log(err.error)
        this.ifThereAreTasks = false;
      }
    )
  }
  openPopUp(data: string, type: boolean) {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(type, data)
  }
  SelectedTask(val: any) {
    this.taskListDataDetails = val;
    console.log(this.taskListDataDetails);
    clearInterval(this.interval);
    this.GetProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid);
    this.tableSpecificTaskOpen = true;
    this.tableMyTaskOpen = false;
  }
  SelectedStart() {
    localStorage.setItem('TaskGuid', this.taskListDataDetails.TaskGuid);
    localStorage.setItem('TaskGuidToSend', this.taskListDataDetails.TaskGuid);

    localStorage.setItem('TaskName', this.taskListDataDetails.Subject);

    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.CreateProjectContentItemByTaskGuid(this.systemGuid, this.taskListDataDetails.TaskGuid).subscribe(res => {
      if (res) {
        this.massageFromServer = res;
        console.log(this.massageFromServer);
      }
    }, err => {
      console.log(err.error);
    })
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds++;
      }
      else {
        this.seconds++;
      }
      this.workTime = this.transformNumber(this.seconds)
      if (this.workTime[0] < 10) {
        this.workTime[0] = "0" + this.workTime[0]
      }
      if (this.workTime[1] < 10) {
        this.workTime[1] = "0" + this.workTime[1]
      }
      if (this.workTime[2] < 10) {
        this.workTime[2] = "0" + this.workTime[2]
      }

      console.log(this.workTime);

      localStorage.setItem('workTime', JSON.stringify(this.workTime))


    }, 1000)
  }
  transformNumber(value: number) {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    return [hours, minutes, seconds]
  }
  SelectedStartPause() {
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds++;
      }
      else {
        this.seconds++;
      }
      this.workTime = this.transformNumber(this.seconds)
      //   localStorage.setItem('workTime', this.workTime)
    }, 1000)
  }

  SelectedStop(time: any) {
    localStorage.removeItem('TaskGuid');
    localStorage.removeItem('TaskName');
    localStorage.getItem('TaskGuidToSend');

    if (time.worktime != "" || time != null) {
      this.timetoSend = time.worktime ? [...time.worktime] : [...time]
      clearInterval(this.interval);
      this.seconds = 0;
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = this.timetoSend[0] + this.timetoSend[1];
      this.isDisabledStart = false;
      this.isTaskAccomplished = false;
      if (time.descriptionTask == undefined) {
        time.descriptionTask = "";
      }
      this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid?this.taskListDataDetails.TaskGuid:localStorage.getItem('TaskGuidToSend'), this.isTaskAccomplished, time.descriptionTask).subscribe(
        res => {
          if (res) {
            this.massageFromServer = res;
            swal(this.massageFromServer);
            this.workTime = ["00", "00", "00"];
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
    if (time.worktime != "") {
      this.timetoSend = [...time.worktime]
      this.seconds = 0;
      clearInterval(this.interval);
      // this.workTime = time;
      if (this.timetoSend[2] > 30) {
        this.timetoSend[1] += 1;
      }
      this.timetoSend[1] = (this.timetoSend[1] / 60)
      this.parseTime = this.timetoSend[0] + this.timetoSend[1];
    }
    this.isTaskAccomplished = true;
    if (time.descriptionTask == undefined) {
      time.descriptionTask = "";
    }
    this.workTime = ["00", "00", "00"];

    this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid, this.isTaskAccomplished, time.descriptionTask).subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          this.tableMyTaskOpen = true;
          this.tableSpecificTaskOpen = false;

          this.AlertIfActualHoursLessThanAllottedHours(this.taskListDataDetails.TaskGuid, this.parseTime, this.massageFromServer)

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
              swal("כל הכבוד!", "", "success");
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

  GetProjectContentItemByTaskGuid(taskGuid: string) {
    this.userService.GetProjectContentItemByTaskGuid(taskGuid).subscribe(
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
  onSearchProject(filterKey = "") {
    console.log(filterKey);
    this.taskArr = [...this.taskArrCopy];
    this.projectArrName = this.projectArr.map(project => project.Name);
    if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
      this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey));
    }
    else {
      this.taskArr = [...this.taskArrCopy];
    }
  }
  clickCloseCard() {
    if (this.workTime[0] === "00" && this.workTime[1] === "00" && this.workTime[2] === "00" || this.workTime === "") {
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
      this.GetProjectContentItemByTaskGuid(this.taskGuidFromLocalStorage);
      this.showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
      this.tableSpecificTaskOpen = true;
      this.tableMyTaskOpen = false;
      this.taskListDataDetails = this.taskNameFromLocalStorage;
      this.isDisabledStart=true;
      this.isDisabledPouse=false;

      this.a = localStorage.getItem('workTime');
      this.workTime = JSON.parse(this.a);
      let hours   =Number(this.workTime[0] )/ 3600; // get hours
      let minutes =Number(this.workTime[1]) - (hours * 3600) / 60; // get minutes
      let seconds = Number(this.workTime[2])+ (hours * 3600) + (minutes * 60); 
      this.ContinueToWorkOnATask(seconds)

    }

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
    }
  }
  mouseLeavePersonalDetails() {
    this.openPersonalDetails = false;
  }
  mouseOvePersonalDetails() {
    this.openPersonalDetails = true;

  }
  // formatter = (result: any) => result.Name;
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.projectArrName.filter((project: string) => project.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))


  BackToMyTask() {
    this.tableMyTaskOpen = true;
    this.tableSpecificTaskOpen = false;

  }
  CheckWhetherInTheMiddleOfWorkOnaTask() {
    if (localStorage.getItem('TaskGuid')) {
      this.taskGuidFromLocalStorage = localStorage.getItem('TaskGuid')
      this.taskNameFromLocalStorage = localStorage.getItem('TaskName')
      this.showMassgeToUserIfInTheMiddleOfWorkOnATask = true;
    }

  }
  ContinueToWorkOnATask(timeToContinue:any) {
    this.interval = setInterval(() => {
      if (timeToContinue === 0) {
        timeToContinue++;
      }
      else {
        timeToContinue++;
      }
      this.workTime = this.transformNumber(timeToContinue)
      if (this.workTime[0] < 10) {
        this.workTime[0] = "0" + this.workTime[0]
      }
      if (this.workTime[1] < 10) {
        this.workTime[1] = "0" + this.workTime[1]
      }
      if (this.workTime[2] < 10) {
        this.workTime[2] = "0" + this.workTime[2]
      }
      console.log(this.workTime);
      localStorage.setItem('workTime', JSON.stringify(this.workTime))

    }, 1000)
   
  }

}


