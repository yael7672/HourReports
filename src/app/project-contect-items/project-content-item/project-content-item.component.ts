import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { ProjectContentItem } from '../../interfacees/project-content-item';
import { PopUpServiceService } from '../../pop-up-service.service';
import { UserServiceService } from '../../user-service.service';

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
  workingHours!: Number;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  updateDetails = false;
  ProjectContentItem: any;
  openCard = false;
  openTable = true;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
    })

  }
  ngOnInit(): void {
   // this.sortTableByDate()
  }
  toTimestamp(sortValue: any) {
    var datum = Date.parse(sortValue);
    return datum / 1000;
  }
  sortTableByDate() {
    this.tableData.sort((a: any, b: any) => {
      const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
      const sortValueTimestampB = this.toTimestamp(b.CreatedOn);

      return ((sortValueTimestampA ? sortValueTimestampA : "") < (sortValueTimestampB ? sortValueTimestampB : "") ? 1 : -1)
    })
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
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');

    this.updateDetails = true;
    this.ProjectContentItem = val;
    this.workingHours = Number(this.ProjectContentItem.WorkingHours)
    console.log(val);
  }
  // UpdateProjectItemButton() {
  //   this.ProjectItemToUpdate = {
  //     Guid: this.ProjectContentItem.Guid,
  //     Description: this.ProjectContentItem.Description,
  //     ActualTime: this.workingHours,
  //   }
  //   this.userServiceService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
  //     (res) => {
  //       this.massageToUser = res;
  //       swal(this.massageToUser)
  //       this.appService.setIsPopUpOpen(false);
  //       this.popUpService.setClosePopUp();
  //     },
  //     (err) =>
  //       alert("error")
  //   )
  // }
  openPopUp(data: string, type: boolean) {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(type, data);
  }
}


