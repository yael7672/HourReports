import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import  swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-project-content-item',
  templateUrl: './project-content-item.component.html',
  styleUrls: ['./project-content-item.component.css']
})
export class ProjectContentItemComponent implements OnInit {
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  workingHours: any
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  updateDetails = false;
  ProjectContentItemGuid = "";
  massageToUser="";
  ProjectItemToUpdate!: any;
  constructor(private userServiceService: UserServiceService,private  appService :AppService,private popUpService:PopUpServiceService) { }

  ngOnInit(): void {

  }
  returnColDataByType(colData: any, tableDataKey: any) {
    if (tableDataKey && typeof tableDataKey === 'string') {
      return colData[tableDataKey]
    }
    else {
      if (colData[tableDataKey[0]]) {
        return colData[tableDataKey[0]][tableDataKey[1]];
      }
      else return null;
    }
  }
  EditProjectContentItemIcon(val: any) {
   
    this.updateDetails = true;
    this.ProjectContentItemGuid = val.Guid;
    console.log(val);
  }
  UpdateProjectItemButton(form: NgForm) {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItemGuid,
      Description: form.value.Description,
      ActualTime: form.value.HoursActually,
      //BillableHours:form.value.BillingHours
    }
    this.userServiceService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate ).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        alert("error")
    )
  }
}

