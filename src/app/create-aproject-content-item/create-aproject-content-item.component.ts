import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../interfacees/project';
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

  todayDate!:any;
  myDate=new Date()
  Project!:Project[];
  WorkType!:WorkType[];
  Regarding!:Regardingobjectid[];
  ProjectContentItem!:ProjectContentItem[];
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
    this.userServiceService.CreateNewProjectItem(form.value).subscribe(
      (res: any) => {
        this.ProjectContentItem = res;
        // console.log(this.user);
        // alert(this.user+"ברוך הבא")
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
        // alert(this.user+"ברוך הבא")
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
        // alert(this.user+"ברוך הבא")
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
        // alert(this.user+"ברוך הבא")
      },
      (err: any) =>
        alert("error")
    )
  }

}
