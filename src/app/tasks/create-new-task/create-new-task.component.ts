import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Regardingobjectid } from 'src/app/interfacees/regardingobjectid';
import { Task } from 'src/app/interfacees/task';
import { WorkType } from 'src/app/interfacees/work-type';
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
  constructor(private datePipe: DatePipe, private userService: UserServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
  }
  ngOnInit(): void {
    this.GetRegarding();
    this.GetWorkType();
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
      Description: form.value.Description,
      BillableHours: form.value.BillableHours,
      Subject: form.value.Subject,
      Regardingobjectid: { "Guid": form.value.Regardingobject },
      WorkType: { "Guid": form.value.WorkType },
      OwnerId: { "Name": "crm@orvaezer.co.il" }
    }
    this.userService.AddNewTask(this.tasks).subscribe(res => {
      if (res) {
        this.massage = res;
        console.log(this.massage);
      }
    },
      err => {
        console.log(err.error);
      }
    )
  }
}
