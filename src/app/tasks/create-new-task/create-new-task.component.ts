import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { Project } from 'src/app/interfacees/project';
import { Regardingobjectid } from 'src/app/interfacees/regardingobjectid';
import { Task } from 'src/app/interfacees/task';
import { WorkType } from 'src/app/interfacees/work-type';
import { MenuComponent } from 'src/app/menu/menu.component';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {
  todayDate!: any;
  myDate = new Date()
  workTypeArr!: WorkType[];
  RegardingobjectArr!: Regardingobjectid[];
  tasks!: any
  workTypecc = "bb";
  massage!: string;
  projectArr!: Project[];
  getMyTasksProp = false;
  isDisabled = false;
  constructor(private buttonWorkingTaskService: ButtonWorkingTaskService, public router: Router, private datePipe: DatePipe, private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.GetRegarding();
    this.GetWorkType();
    this.GetProject();
  }
  startTask() {
  }
  GetWorkType() {
    this.userService.GetWorkType().subscribe(res => {
      if (res) {
        this.workTypeArr = res;
      }
    },
      err => {
        console.log(err.error);
      }
    )
  }
  GetRegarding() {
    this.userService.GetRegarding().subscribe(res => {
      if (res) {
        this.RegardingobjectArr = res;
      }
    },
      err => {
        console.log(err.error);
      }
    )
  }
  async CreateNewTask(form: NgForm) {
    this.isDisabled = true;
    this.tasks =
    {
      Description: form.value.Description,
      BillableHours: form.value.BillableHours,
      Subject: form.value.Subject,
      // NotesToTheProjectManager: form.value.CommentsToTheProjectManager,הערות למנהל הפרוייקט
      // Regardingobjectid: { "Guid": form.value.Regardingobject },לגבי
      WorkType: { "Guid": form.value.workType.Guid },
      OwnerId: { "Guid": localStorage.getItem('systemGuid') },
      Project: { "Guid": form.value.project.Guid  }
    }
    this.AddNewTask()
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

  async AddNewTask() {
    this.userService.AddNewTask(this.tasks).then(res => {
      if (res) {
        this.massage = res;
        this.getMyTasksProp = true
        swal(this.massage);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        this.popUpService.setAllmyTask(true)
        this.popUpService.setAllMyNewTask(false);
        this.router.navigate(['/menu/show-my-task',localStorage.getItem('systemGuid')]);
      }
    },
      err => {
        console.log(err.error);
        this.isDisabled = false;
      }
    )
    this.getMyTasksProp = false
    window.localStorage.setItem("getMyTask", JSON.stringify(this.getMyTasksProp))
  }
}
