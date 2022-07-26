import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import  swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { PopUpServiceService } from '../pop-up-service.service';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-my-project-contect-items',
  templateUrl: './my-project-contect-items.component.html',
  styleUrls: ['./my-project-contect-items.component.css']
})
export class MyProjectContectItemsComponent implements OnInit {
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;

  workingHours!: Number;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  myCompProjectItem = new ProjectContentItemComponent(this.userServiceService, this.appService, this.popUpService)
  systemGuid: any;
  updateDetails = false;
  ProjectContentItem:any;
  // ProjectContentItem
  massageToUser="";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  constructor(private userServiceService: UserServiceService,private  appService :AppService,private popUpService:PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log(this.isPopUpOpen);
    })

  }
  MyProjectContectItemArr!: ProjectContentItem[]

  ngOnInit(): void {
    this.sortTableByDate()
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
 
    toTimestamp(sortValue: any) {
      var datum = Date.parse(sortValue);
      return datum / 1000;
    }
    sortTableByDate( ){
      this.tableData.sort((a: any, b: any) => {
        const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
        const sortValueTimestampB = this.toTimestamp(b.CreatedOn);
        
        return ((sortValueTimestampA?sortValueTimestampA:new Date()) >  (sortValueTimestampB?sortValueTimestampB:new Date()) ? 1 : -1)
      })
    }
  
  EditProjectContentItemIcon(val: any) {
   
    this.updateDetails = true;
    this.ProjectContentItem=val;
    this.workingHours=Number(this.ProjectContentItem.WorkingHours)
    console.log(val);
  }
  UpdateProjectItemButton() {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItem.Guid,
      Description:this.ProjectContentItem.Description,
      ActualTime: this.ProjectContentItem.WorkingHours,
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
  openPopUp(data: string, type: boolean) {
      this.appService.setIsPopUpOpen(true);
      this.popUpService.setSpecificPopUp(type, data)
    }
  }


