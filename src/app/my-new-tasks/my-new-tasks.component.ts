import { Component, OnInit } from '@angular/core';
import  swal from 'sweetalert';
import { Task } from '../interfacees/task';
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
  systemUser:any
  thArrMyNewTask = ['שם המשימה','תיאור המשימה']
  MyNewTaskKey=['Subject','Description']
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.GetMyNewTasks()
  }
  
  GetMyNewTasks(){
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

  showDetailsTask(val: any) {
    this.openDetailsTask = true
    this.detailsTask = val
    this.UpdateTaskHasRead(this.detailsTask.TaskGuid)
  }

  UpdateTaskHasRead(taskGuid:any){
    this.systemGuid = localStorage.getItem("systemGuid")
    
    this.userService.UpdateTaskHasRead(this.systemGuid,taskGuid).subscribe(
      (res: any) => {
        this.MarkTaskRes = res;
        alert(this.MarkTaskRes)
      },
      (err: any) =>
        swal(err.error)
    )
  }


}
