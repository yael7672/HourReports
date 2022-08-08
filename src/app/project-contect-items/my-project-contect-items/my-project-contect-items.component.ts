import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { ProjectContentItem } from '../../interfacees/project-content-item';
import { PopUpServiceService } from '../../pop-up-service.service';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../../user-service.service';

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
  @Input() hideProjectTh!: Boolean;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  myCompProjectItem = new ProjectContentItemComponent(this.userServiceService, this.appService, this.popUpService)
  systemGuid: any;
  updateDetails = false;
  ProjectContentItem: any;
  workingHours!: Number;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  ifSortDown = true;
  showMassgeToUser = false;
  massgeUserHeader = "";
  massgeUserBody = "האם אתה בטוח שברצונך למחוק דיווח זה?"
  massgeUserFooter = "";
  kindOfMassage = 'deleteProjectContentItem';
  projectContentItemGuid = "";
  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
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
  sortTableByDate() {
    this.tableData.sort((a: any, b: any) => {
      const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
      const sortValueTimestampB = this.toTimestamp(b.CreatedOn);

      return ((sortValueTimestampA ? sortValueTimestampA : new Date()) > (sortValueTimestampB ? sortValueTimestampB : new Date()) ? 1 : -1)
    })
  }

  EditProjectContentItemIcon(val: any) {
    this.updateDetails = true;
    this.ProjectContentItem = val;
    this.workingHours = Number(this.ProjectContentItem.WorkingHours)
    console.log(val);
  }
  UpdateProjectItemButton() {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItem.Guid,
      Description: this.ProjectContentItem.Description,
      ActualTime: this.workingHours,
      //BillableHours:form.value.BillingHours
    }
    this.userServiceService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        this.popUpService.SetProjectContentItemByTaskGuid(true)
      },
      (err) =>
        alert("error")
    )
  }
  openPopUp(data: string, type: boolean) {
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(type, data)
  }
  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'משך':
        keyToSort = 'WorkingHours';
        break;
      case 'תאור':
        keyToSort = 'Description';
        break;
      case 'סוג עבודה':
        keyToSort = ['WorkType', 'Name'];
        break;
      case 'שם':
        keyToSort = 'Name';
        break;
      case 'שעות לחיוב?':
        keyToSort = 'BillableHours';
        break;
      default:
        break;
    }
    //  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];

    if (keyToSort[0] != 'WorkType') {
      this.tableData.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.tableData?.sort((a: any, b: any) =>

        (keyToSort[1] > (keyToSort[1])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;

    let keyToSort: any;
    switch (thName) {
      case 'תאריך':
        keyToSort = 'Date';
        break;
      case 'משך':
        keyToSort = 'WorkingHours';
        break;
      case 'תאור':
        keyToSort = 'Description';
        break;
      case 'סוג עבודה':
        keyToSort = ['WorkType', 'Name'];
        break;
      case 'שם':
        keyToSort = 'Name';
        break;
      case 'שעות לחיוב?':
        keyToSort = 'BillableHours';
        break;
      default:
        break;
    }
    // thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];

    if (keyToSort[0] != 'WorkType') {
      this.tableData.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.tableData?.sort((a: any, b: any) =>
      (keyToSort[1] < keyToSort[1]) ? 1 : -1)
  
    }
  }
  DeleteProjectContentItemIcon(ProjectContentItem: any) {
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid
  }
  clickYes(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.DeleteProjectContentItemByGuid()
    }
  }
  DeleteProjectContentItemByGuid() {
    this.userServiceService.DeleteProjectContentItemByGuid(this.projectContentItemGuid).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.showMassgeToUser = false;
      },
      (err) =>
        swal(err.error))

  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.showMassgeToUser = false;
    }
  }
}


