import { DatePipe } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../interfacees/project';
import { Task } from '../interfacees/task';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { Regardingobjectid } from '../interfacees/regardingobjectid';
import { WorkType } from '../interfacees/work-type';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-create-aproject-content-item',
  templateUrl: './create-aproject-content-item.component.html',
  styleUrls: ['./create-aproject-content-item.component.css']
})
export class CreateAprojectContentItemComponent implements OnInit {
  @Input() MyTask!: any;
  todayDate!:any;
  myDate=new Date()
  Project!:Project[];
  WorkType!:WorkType[];
  Regarding!:Regardingobjectid[];
  ProjectContentItem!:any
  systemGuid: any;
  ProjectItem!:any
  taskGuid!:any
  projectGuid:any
  workTypeGuid: any;
  constructor(private datePipe: DatePipe ,private userServiceService:UserServiceService ) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   console.log(this.todayDate);
}
  ngOnInit(): void {
    this.GetRegarding()
    this.GetProject()
    this.GetWorkType()
  }

  CreateNewProjectItem(form:NgForm){
    this.taskGuid= form.value.SourceTask.toUpperCase()
    this.projectGuid= form.value.project.toUpperCase()
    this.workTypeGuid= form.value.workType.toUpperCase()
    
    this.ProjectItem =
    {
       OwnerId: { "Guid": localStorage.getItem('systemGuid') },
       Name:form.value.Subject,
       Project: { "Guid": this.projectGuid },
       CustomTask:{"TaskGuid":this.taskGuid},
       WorkType: { "Guid": this.workTypeGuid },
    }
    this.userServiceService.CreateNewProjectItem(this.ProjectItem).subscribe(
      (res: any) => {
        this.ProjectContentItem = res;
        alert(this.ProjectContentItem)

      },
      (err: any) =>
        alert("error")
    )
  }
  
  GetRegarding(){
    this.userServiceService.GetRegarding().subscribe(
      (res: any) => {
        this.Regarding = res;
        console.log(this.Regarding);
      },
      (err: any) =>
        alert("error")
    )
  }
  
  GetWorkType(){
    this.userServiceService.GetWorkType().subscribe(
      (res: any) => {
        this.WorkType = res;
        console.log(this.WorkType);
      },
      (err: any) =>
        alert("error")
    )
  }

  GetProject(){
    this.userServiceService.GetProject().subscribe(
      (res: any) => {
        this.Project = res;
        console.log( this.Project);
      },
      (err: any) =>
        alert("error")
    )
  }


}
