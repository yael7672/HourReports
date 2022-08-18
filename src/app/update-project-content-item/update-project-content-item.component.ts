import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import  swal from 'sweetalert';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { WorkType } from '../interfacees/work-type';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-update-project-content-item',
  templateUrl: './update-project-content-item.component.html',
  styleUrls: ['./update-project-content-item.component.css']
})
export class UpdateProjectContentItemComponent implements OnInit {
  @Input() ProjectContentItem : any
  @Input() project:any
  @Input() workType:any
  updateDetails = false;
  openCard = false;
  openTable = true;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  workingHours!: Number;
  WorkTimeArr!:any
  constructor(private router:Router ,private userServiceService: UserServiceService, private appService: AppService,
     private popUpService: PopUpServiceService,private elementRef: ElementRef,private buttonWorkingTaskService: ButtonWorkingTaskService
     ,private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.ProjectContentItem);
    this.workingHours = Number(this.ProjectContentItem.WorkingHours)

  }
  UpdateProjectItemButton() {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItem.Guid,
      Description: this.ProjectContentItem.Description,
      ActualTime: this.workingHours, 
      WorkType: this.workType,
      Project:this.project
    }
    this.userServiceService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.popUpService.SetProjectContentItemByTaskGuid(true);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        alert("error")
    )
  }

}
