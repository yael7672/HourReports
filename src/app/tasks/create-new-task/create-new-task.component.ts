import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/app-service.service';
import { Project } from 'src/app/interfacees/project';

import { Regardingobjectid } from 'src/app/interfacees/regardingobjectid';
import { Task } from 'src/app/interfacees/task';
import { WorkType } from 'src/app/interfacees/work-type';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
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
  constructor(private datePipe: DatePipe, private userService: UserServiceService, private appService: AppService,private popUpService:PopUpServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
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
        console.log(this.workTypeArr);
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
        console.log(this.RegardingobjectArr);
      }
    },
      err => {
        console.log(err.error);
      }
    )
  }
  CreateNewTask(form: NgForm) {
    this.tasks =
    {
      Description:form.value.Description,
      BillableHours:form.value.BillableHours,
      Subject: form.value.Subject,
      NotesToTheProjectManager: form.value.CommentsToTheProjectManager,
      Regardingobjectid: { "Guid": form.value.Regardingobject },
      WorkType: { "Guid": form.value.WorkType },
      OwnerId: { "Guid": localStorage.getItem('systemGuid') },
      Project: { "Guid": form.value.Project  }

    }
    this.userService.AddNewTask(this.tasks).subscribe(res => {
      if (res) {
        this.massage = res;
        console.log(this.massage);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      }
    },
      err => {
        console.log(err.error);
      }
    )
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
}
