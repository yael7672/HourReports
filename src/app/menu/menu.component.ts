import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Project } from '../interfacees/project';
import { Task } from '../interfacees/task';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import { TaskByGuid } from '../interfacees/TaskByGuid';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeCounterComponent } from '../time-counter/time-counter.component';
import { ProjectType } from '../interfacees/ProjectType';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isPopUpOpen!: any;
  taskListDataDetails!: any;
  workTime: any;
  taskArr!: Task[];
  systemGuid: any;
  projectArr!: Project[];
  projectArrName!: string[];
  showMassgeToUser = false;
  massgeUserRefreshWebsiteInMiddlePauseBody = "!שים לב";
  massgeUserRefreshWebsiteInMiddlePauseHeader = "היית באמצע הפסקה";
  massgeUserRefreshWebsiteInMiddlePauseFooter = "האם ברצונך לשוב לעבוד?";
  massgeUserFinishtasklesstimeBody = "שעות העבודה על המשימה היו פחות ממשך הזמן שהוקצה לה!";
  massgeUserFinishtasklesstimeBody2 = " שעות עבודה לעומת שעות בפועל "
  massgeUserFinishtasklesstimeHeader = "כל הכבוד"
  TaskByGuidObject!: TaskByGuid;
  openPersonalDetails = false;
  taskGuidFromLocalStorage: any;
  kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite = 'kindOfMassageifInTheMiddleOfPauseAndRefreshWebsite'
  showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false;
  showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = false;
  showMassgeToUseMIfFinishtasklesstime = false;
  endButton!: boolean;
  ifButtonFalse !: boolean;
  openMyProjectContectItem = false
  workTypeArr: any;
  todayDate: any;
  startWorkOfTask = false;
  myDate = new Date()
  ifX = true
  taskListDataDetailsParseToJson: any;
  MyNewTaskArr: any;
  ifThereNewTasks = false;
  DateArr: any
  LastDateInThisMonth!: any;
  TwoLastDaysInThisMonth!: any;
  OneDaysInThisMonth!: any;
  showMassgeToManager = false
  taskNameFromLocalStorage: any
  openDropdown = true;
  massgeUserIfInTheMiddleOfWorkOnATaskAndOpenPauseBody = "?האם ברצונך לצאת להפסקה"
  massgeUserIfInTheMiddleOfWorkOnATaskAndOpenPauseHeader = "שים לך אתה באמצע עבודה על משימה"
  Time: any;
  menuOpen = true;
  showNavBar = false;
  kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause = "kindOfMassageifInTheMiddleOfWorkOnATaskkAndOpenPause"
  openMyNewTaskPopUp = false
  image: any;
  isUnder1100: boolean;
  ProjectTypeArr: any;
  DateNowPause: any
  youAreInPause !:boolean
  constructor(public router: Router,
    private activatedRoute: ActivatedRoute, private popUpService: PopUpServiceService,
    private userService: UserServiceService,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService, private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      if (this.isPopUpOpen) {
        this.popUpService.setNavBar(false)
      }
    })
    var appProperties = this.appService.getAppProperties()
    this.isUnder1100 = appProperties.isUnder1680$.value;
    console.log(this.isUnder1100);
    this.popUpService.getAllMyNewTask().subscribe(res => {
      this.ifThereNewTasks = res;
      this.GetMyNewTasks();
    })
    this.DateNowPause=localStorage.getItem("DateNowPause")
    if (this.DateNowPause) {
      this.popUpService.setInPause(true);
    }
    this.popUpService.getInPause().subscribe(res => {
      this.youAreInPause = res ;
    })
    this.popUpService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
    //   this.popUpService.GetIfStartPouse().subscribe(res => {
    //     if (res) {
    //       this.showMassgeToUserIfInTheMiddleOfPauseAndRefreshWebsite = true;
    //     }
    //   })
  }
  ngOnInit(): void {

    this.GetWorkType()
    this.GetProject();
    this.MessageToTheManager();
    this.image = localStorage.getItem('image');
    this.systemGuid = localStorage.getItem('systemGuid');
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails)
    this.taskNameFromLocalStorage = localStorage.getItem("taskListDataDetails")
    if (localStorage.getItem("DateNowPause")) {
      this.openPopUp('pause', true)
    }
    if (localStorage.getItem("DateNowProjectContectItemWithTimer")) {
      this.openPopUp('timeOfProjectContectItem', true)
    }
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = localStorage.getItem('DateNow') ? true : false;
    }

  }

  returnToTheOpenTask() {
    this.router.navigate(['/menu/specific-task', this.taskListDataDetailsParseToJson.TaskGuid])
  }
  checkIfMemuOpen() {
    this.popUpService.setNavBar(true)
  }
  closePersonalDetails() {
    this.openPersonalDetails = false;
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

  openPopUp(data: string, type: boolean) {
    if (data == 'pause') {
      // this.popUpService.getStartTimer().subscribe(res => {
      // if (res) {
      if (this.startWorkOfTask) {
        // this.startWorkOfTask = true;
        this.taskNameFromLocalStorage = "שם המשימה:" + this.taskListDataDetailsParseToJson?.Subject;
        this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = true;
      }

      else {
        this.appService.setIsPopUpOpen(true);
        this.popUpService.setSpecificPopUp(type, data)
      }
      // })
    }
    // if (data == 'MyNewTask') {
    //   this.openMyNewTaskPopUp = true
    // }
    else {
      this.appService.setIsPopUpOpen(true);
      this.popUpService.setSpecificPopUp(type, data)
    }
  }

  goToMyprojectContentItem() {
    this.popUpService.setNavBar(false);
    this.router.navigate(['/menu/my-project-contect-items-component', this.systemGuid])
  }
  GetProject() {
    this.userService.GetProject().subscribe(res => {
      if (res) {
        this.projectArr = res;
        this.projectArrName = this.projectArr.map(project => project.Name);
      }
    },
      err => {
        console.log(err.error);
      })
  }
  GoToStatisticsGraph() {
    this.popUpService.setNavBar(false);
    this.router.navigate(['menu/StatisticsGraph'])
  }
  GoToHome() {
    this.popUpService.setNavBar(false);
    this.router.navigate(['menu/show-my-task', this.systemGuid])
  }
  ClickPersonalDetails() {
    this.openPersonalDetails = true;
  }
  openPopUpMyNewTask() {
    this.openMyNewTaskPopUp = true
  }
  Logout() {
    localStorage.clear();
    swal("!התנתקת בהצלחה")
    setTimeout(() => {
      this.router.navigate(['/']);
      this.appService.setIsLogin(false);

    }, 1000)
  }

  onClickedOutside(val: any) {
    if (this.openPersonalDetails) {
      this.openPersonalDetails = false;
    }
  }
  onClickedOutsideNav() {
    if (this.showNavBar) {
      this.showNavBar = false;
    }
  }
  onClickedOutsideMyNewTask(val: any) {
    if (this.openMyNewTaskPopUp) {
      this.openMyNewTaskPopUp = false;
    }
  }
  GetMyNewTasks() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyNewTasks(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.MyNewTaskArr = res;
          if (this.MyNewTaskArr.length <= 0) {
            this.ifThereNewTasks = true
          }
          else {
            this.ifThereNewTasks = false
          }
        }
      }, err => {
        console.log(err.error)
        // if (err.error = "'tasks' is null!") {
        //   this.ifThereNewTasks = true
        // }
      }
    )
  }
  MessageToTheManager() {
    this.userService.MessageToTheManager().subscribe(res => {
      if (res) {
        this.DateArr = res;
        this.LastDateInThisMonth = this.datePipe.transform(this.DateArr.LastDateInThisMonth, 'dd/MM/yyyy')
        this.TwoLastDaysInThisMonth = this.datePipe.transform(this.DateArr.TwoLastDaysInThisMonth, 'dd/MM/yyyy')
        this.OneDaysInThisMonth = this.datePipe.transform(this.DateArr.OneDaysInThisMonth, 'dd/MM/yyyy')
        if (this.todayDate == this.LastDateInThisMonth || this.todayDate == this.TwoLastDaysInThisMonth || this.todayDate == this.OneDaysInThisMonth) {
          this.showMassgeToManager = true
        }
      }
    },
      err => {
        console.log(err.error);
      })
  }
  removeDateFromLocalStorage() {
    localStorage.removeItem("dateToUpdate");
  }
  clickYesGoingBreak(val: any) {
    this.getCreatedProjectContentItemFromLoaclStorage()
    this.GoToPausetimerTask()
    this.openPopUp('pause', true)

  }
  clickNoGoingbreak() {
    this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false
  }
  getCreatedProjectContentItemFromLoaclStorage() {
    if (localStorage.getItem('DateNow')) {
      this.setWorkTime(localStorage.getItem('DateNow'))
    }
  }
  setWorkTime(res: any) {
    this.workTime = this.convertTimeStempToTime(res)
  }
  convertTimeStempToTime(ProjectContentItemCreatedDate: any) {
    var timestampCreatOn = ProjectContentItemCreatedDate;
    const timestampNow = Date.now();
    this.Time = timestampNow - timestampCreatOn;
    return this.datePipe.transform(this.Time, 'HH:mm:ss', "+0000");
    this.GoToPausetimerTask()
  }
  GoToPausetimerTask() {
    let pauseTaskComp = new TimeCounterComponent(this.activatedRoute, this.userService, this.datePipe, this.popUpService, this.router, this.appService)
    pauseTaskComp.pauseTimer(this.workTime)
    this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = false
    this.router.navigate(['/menu/show-my-task', this.systemGuid]);

  }

  closeNavBar() {
    this.popUpService.setNavBar(false);
  }


  GetProjectType() {
    this.userService.GetProjectType().subscribe(
      (res: any) => {
        this.ProjectTypeArr = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }
}
