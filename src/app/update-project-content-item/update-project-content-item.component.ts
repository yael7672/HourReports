import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-project-content-item',
  templateUrl: './update-project-content-item.component.html',
  styleUrls: ['./update-project-content-item.component.css']
})
export class UpdateProjectContentItemComponent implements OnInit {
  @Input() ProjectContentItem: any
  updateDetails = false;
  openCard = false;
  openTable = true;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  workingHours!: Number;
  dateToUpdate: any;
  oneDate: any;
  projectsArr: any;
  workTypeArr: any;
  workTypeToUpdate:any;
  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService,private datePipe:DatePipe) { }

  ngOnInit(): void {
    console.log(this.ProjectContentItem);
    this.dateToUpdate = this.datePipe.transform(this.ProjectContentItem.Date, 'yyyy-MM-dd');

    this.workingHours = Number(this.ProjectContentItem.WorkingHours);
    this.workTypeToUpdate={"Guid":this.ProjectContentItem.WorkType.Guid,"Name":this.ProjectContentItem.WorkType.Name}
    this.GetProject();
    this.GetWorkType();
  }
  GetWorkType() {
    this.userServiceService.GetWorkType().subscribe(
      (res: any) => {
        this.workTypeArr = res;
        console.log(this.workTypeArr);
      },
      (err: any) =>
        swal(err.error))
  }
  GetProject() {
    this.userServiceService.GetProject().subscribe(
      (res: any) => {
        this.projectsArr = res;
        console.log(this.projectsArr);
      },
      (err: any) =>
        swal(err.error))
  }
  UpdateProjectItemButton() {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItem.Guid,
      Description: this.ProjectContentItem.Description,
      ActualTime: this.workingHours,
    }
    this.userServiceService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.popUpService.SetProjectContentItemByTaskGuid(true);
        this.popUpService.setAllmyProjectContectItem(true);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        alert("error")
    )
  }

}
