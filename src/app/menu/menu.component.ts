import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Project } from '../interfacees/project';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  isPopUpOpen!: any;
  taskListData: any;
  taskListDataDetails: any;
  taskListDataDetails1: any;
  ifDescriptionPanel = false;
  descriptionPanel: any;
  interval: any;
  minutes: number = 0;
  seconds: number = 0;
  hours: number = 0;
  workTime!: any;
  titleTableTask = 'המשימות שלי';
  titleTableProjectContentItemComponent = 'דיווחי שעות';
  titleCard = 'פרטי המשימה';
  thArrTask = ['שם המשימה', 'תאריך', 'פרוייקט'];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  taskListKeys = ['Subject', 'CreatedOn'];
  projectContentItemListKeys = ['Name', 'CreatedOn', 'Description', 'BillableHours', 'WorkingHours', 'WorkType[Name]'];
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
  taskArrCopy!: any[]
  taskArr!: Task[];
  tableSpecificTaskOpen = false;
  tableMyTaskOpen = true;
  systemGuid: any;
  isSelected = false;
  hideButtonCancel = false
  projectArr!: Project[];
  showMassgeToUser = false;
  timeToSave: any;
  SystemGuid: any;
  massgeUserCloseTask1="?האם אתה בטוח שברצונך לצאת"
  massgeUserCloseTask2="!שים לב"
  massgeUserCloseTask3="פעולה זו סוגרת לך את המשימה"
  
  // massgeUserCloseWorkPause2=
  // massgeUserCloseWorkPause3=
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

      if (this.isButtobChoose.start) {
        this.isDisabledStart = true;
        this.isDisabledPouse = false;

      }
      if (this.isButtobChoose.end) {
        this.isDisabledStart = true;
        this.isDisabledEnd = true;
        this.isDisabledPouse = true;
      }
      if (this.isButtobChoose.chooseAnotherTask) {
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
    this.GetMyTask()
  }
  GetMyTask() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyTask(this.systemGuid).subscribe(
      res => {
        if (res)
          this.taskArr = res;
        console.log(this.taskArr);

      }, err =>
      console.log(err.massage)
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
    this.GetProjectContentItemByTaskGuid();
    this.tableSpecificTaskOpen = true;
    this.tableMyTaskOpen = false;
  }
  SelectedStart() {
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
      localStorage.setItem('workTime', this.workTime)
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
    this.systemGuid = localStorage.getItem('systemGuid');
    this.interval = setInterval(() => {
      if (this.seconds === 0) {
        this.seconds++;
      }
      else {
        this.seconds++;
      }
      this.workTime = this.transformNumber(this.seconds)
      localStorage.setItem('workTime', this.workTime)
    }, 1000)
  }
  SelectedStop(time: any) {
    this.timetoSend = [...time]
    clearInterval(this.interval);
    console.log(this.interval);
    this.seconds = 0;
    let a = "0." + this.timetoSend[2]
    if (Math.round(Number(a)) != 0) {
      this.timetoSend[1] += 1;
    }
    if (this.timetoSend[1] < 10) {
      this.parseTime = this.timetoSend[0] + ".0" + this.timetoSend[1];
    }
    else {
      this.parseTime = this.timetoSend[0] + "." + this.timetoSend[1];
    }
    this.isTaskAccomplished = false;
    this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid, this.isTaskAccomplished).subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          alert(this.massageFromServer)
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }
  SelectedEnd(time: any) {
    this.timetoSend = [...time]
    this.seconds = 0;
    clearInterval(this.interval);
    this.isTaskAccomplished = true;
    // this.workTime = time;
    let a = "0." + this.timetoSend[2];
    if (Math.round(Number(a)) != 0) {
      this.timetoSend[1] += 1;
    }
    if (this.timetoSend[1] < 10) {
      this.parseTime = this.timetoSend[0] + ".0" + this.timetoSend[1];
    }
    else {
      this.parseTime = this.timetoSend[0] + "." + this.timetoSend[1];
    }
    this.userService.UpdateProjectContentItem(this.parseTime, this.taskListDataDetails.TaskGuid, this.isTaskAccomplished).subscribe(
      res => {
        if (res) {
          this.massageFromServer = res;
          alert(this.massageFromServer)
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
  GetProjectContentItemByTaskGuid() {
    this.userService.GetProjectContentItemByTaskGuid(this.taskListDataDetails.TaskGuid).subscribe(
      res => {
        if (res) {
          this.projectContentItemArr = res;
          console.log(this.projectContentItemArr);
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
        console.log(this.projectArr);

      }
    },
      err => {
        console.log(err.error);
      })
  }
  onSearchProject() {
    alert(this.selectedOption)
    this.taskArrCopy = [...this.taskArr]
    let arr: any;
    this.taskArr = this.taskArrCopy.filter(f => f.Project.Name == this.selectedOption)
    alert("yes")
  }
  clickCloseCard() {
    this.showMassgeToUser = true;
  }
  clickYes() {
    this.tableMyTaskOpen = true;
    this.tableSpecificTaskOpen = false;
    this.showMassgeToUser = false;
    this.SelectedStop(this.workTime)
  }
  clickNo() {
    this.showMassgeToUser = false;
    this.tableMyTaskOpen = false;
    this.tableSpecificTaskOpen = true;
  }
}



