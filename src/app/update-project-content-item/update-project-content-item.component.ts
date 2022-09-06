import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { WorkType } from '../interfacees/work-type';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-update-project-content-item',
  templateUrl: './update-project-content-item.component.html',
  styleUrls: ['./update-project-content-item.component.css']
})
export class UpdateProjectContentItemComponent implements OnInit {
  @Input() ProjectContentItem: any;
  @Input() project: any;
  @Input() workType: any;
  @Input() ifUpdateTask: any;
  @Input() header: any;
  @Input() kindUpdate: any;
  @Input() ifAdmin: any;
  @Input() myProjectContectItemArr: any;
  updateDetails = false;
  openCard = false;
  openTable = true;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  workingHours!: Number;
  WorkTimeArr!: any
  TaskToUpdate: any;
  allUserAndTeams: any;
  systemGuid: any;
  actualHours: any;
  date:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserServiceService, private appService: AppService,
    private popUpService: PopUpServiceService, private elementRef: ElementRef, private buttonWorkingTaskService: ButtonWorkingTaskService
    , private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.date = this.datePipe.transform(this.ProjectContentItem?.Date, 'yyyy-MM-dd');
    this.actualHours = Number(this.ProjectContentItem?.WorkingHours)
    if (this.ProjectContentItem?.ActualTime != "")
      this.workingHours = Number(this.ProjectContentItem?.ActualTime ? this.ProjectContentItem?.ActualTime : "")
    else {
      this.workingHours = this.ProjectContentItem?.ActualTime
    }
    this.GetAllUserAndTeams();
  }
  UpdateTaskOrProjectContectItem(f: NgForm) {
    if (this.kindUpdate == 'updateTaskDetails') {
      this.UpdateTaskDetails(f)
    }
    else {
      if (this.kindUpdate == 'updateProjectContectItem') {
        this.UpdateProjectItemButton(f)
      }
    }
  }

  UpdateTaskDetails(form: NgForm) {
    this.TaskToUpdate = {
      Date:this.date,
      Project: form.value.Project.Guid,
      TaskGuid: this.ProjectContentItem.TaskGuid,
      WorkType: form.value.WorkType.Guid,
      AssignTask: form.value.AssignTask.Guid,
      Description: this.ProjectContentItem.Description,
      Subject: this.ProjectContentItem.Subject,
    }
    this.userService.UpdateTaskDetails(this.TaskToUpdate.TaskGuid, this.TaskToUpdate.Project, this.TaskToUpdate.Description, this.TaskToUpdate.Subject, this.TaskToUpdate.WorkType, this.TaskToUpdate.AssignTask).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.popUpService.SetProjectContentItemByTaskGuid(true);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        console.log(err.error)
    )
  }
  UpdateProjectItemButton(form: NgForm) {
    
    this.ProjectItemToUpdate = {
      Date:this.date,
      Guid: this.ProjectContentItem.Guid,
      Description: this.ProjectContentItem.Description,
      ActualTime: this.actualHours,
      WorkingHours: this.workingHours,
      WorkType: { "Guid": this.ProjectContentItem.WorkType.Guid },
      Project: { "Guid": this.ProjectContentItem.Project.Guid },
    }
    this.userService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');

        if (window.location.pathname == '/my-project-contect-items-component/', this.systemGuid) {
          this.popUpService.setAllmyProjectContectItem(true);
          this.appService.setIsPopUpOpen(false);
          this.popUpService.setClosePopUp()
        } else {
          this.popUpService.SetProjectContentItemByTaskGuid(true);
          this.appService.setIsPopUpOpen(false);
          this.popUpService.setClosePopUp();
        }
      },
      (err) =>
        console.log(err.error)
    )
  }
  GetAllUserAndTeams() {
    this.userService.GetAllUserAndTeams().subscribe(res => {
      if (res) {
        this.allUserAndTeams = res;
      }
    },
      err => {
        console.log(err.error);
      }
    )
  }
}
