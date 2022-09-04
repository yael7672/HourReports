import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { Task } from '../interfacees/task';
import { MenuComponent } from '../menu/menu.component';
import { PopUpServiceService } from '../pop-up-service.service';
import { ShowMyTaskComponent } from '../tasks/show-my-task/show-my-task.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-my-new-tasks',
  templateUrl: './my-new-tasks.component.html',
  styleUrls: ['./my-new-tasks.component.css']
})
export class MyNewTasksComponent implements OnInit {
  systemGuid: any;
  MyNewTaskArr!: any;
  ifHideEditOrDelete = true
  openDetailsTask = false
  HideSortIcon = true
  detailsTask: any
  MarkTaskRes: any;
  systemUser: any
  thArrMyNewTask = ['שם המשימה', 'תיאור המשימה']
  MyNewTaskKey = ['Subject', 'Description']
  constructor(private userService: UserServiceService, private router: Router, private popUpService: PopUpServiceService,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService
    , private datePipe: DatePipe) {
    this.popUpService.getAllmyTask().subscribe(res => {
      if (res)
        this.GetMyNewTasks()
    })
  }

  ngOnInit(): void {
    this.GetMyNewTasks()
  }

  GetMyNewTasks() {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetMyNewTasks(this.systemGuid).subscribe(
      res => {
        if (res) {
          this.MyNewTaskArr = res;
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }

  showDetailsTask(val: any) {
    this.openDetailsTask = true
    this.closePopUp()
    this.popUpService.setAllmyTask(true)
    this.detailsTask = val
    let showMyTaskComp = new ShowMyTaskComponent(this.popUpService, this.buttonWorkingTaskService, this.appService, this.userService, this.router)
    showMyTaskComp.SelectedTask(this.detailsTask)
    this.UpdateTaskHasRead(this.detailsTask.TaskGuid)
  }

  UpdateTaskHasRead(taskGuid: any) {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.userService.UpdateTaskHasRead(this.systemGuid, taskGuid).subscribe(
      (res: any) => {
        this.MarkTaskRes = res;
        // swal(this.MarkTaskRes)
      },
      (err: any) =>
        swal(err.error)
    )
  }


}
