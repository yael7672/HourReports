import { jsDocComment, outputAst } from '@angular/compiler';
import { Component, Directive, ElementRef, AfterViewInit, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Project } from '../interfacees/project';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { Task } from '../interfacees/task';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import { Observable, OperatorFunction, Subject } from 'rxjs';
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
  constructor(public router: Router,
    private popUpService: PopUpServiceService,
    private userService: UserServiceService,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService, private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    this.popUpService.getStartTimer().subscribe(res => {
      if (res)
        this.startWorkOfTask = true;
      else
        this.startWorkOfTask = false;
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
    this.systemGuid = localStorage.getItem('systemGuid');
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails)
    if (localStorage.getItem("DateNowPause")) {
      this.openPopUp('pause', true)
    }
    if (localStorage.getItem("DateNowProjectContectItemWithTimer")) {
      this.openPopUp('timeOfProjectContectItem', true)
    }
    if (localStorage.getItem('DateNow')) {
      this.startWorkOfTask = true;
    }
    else {
      this.startWorkOfTask = false;
    }
  }
  returnToTheOpenTask() {
    this.router.navigate(['/specific-task', this.taskListDataDetailsParseToJson.TaskGuid])
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
      this.popUpService.getStartTimer().subscribe(res => {
        if (res) {
          this.startWorkOfTask = true;
          this.taskListDataDetailsParseToJson.Subject = "שם המשימה:" + this.taskListDataDetailsParseToJson.TaskByGuid;
          this.showMassgeToUserIfInTheMiddleOfWorkOnATaskAndOpenPause = true;
        } else {
          this.appService.setIsPopUpOpen(true);
          this.popUpService.setSpecificPopUp(type, data)
        }
      })
    }
    else {
      this.appService.setIsPopUpOpen(true);
      this.popUpService.setSpecificPopUp(type, data)
    }
  }
  goToMyprojectContentItem() {
    this.router.navigate(['/my-project-contect-items-component'])
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
    this.router.navigate(['StatisticsGraph'])
  }
  GoToHome() {
    this.router.navigate(['show-my-task']);
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

  onClickedOutside(val: any) {
    if (this.openPersonalDetails) {
      this.openPersonalDetails = false;
    }
  }
}
