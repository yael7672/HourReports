import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { ProjectContentItem } from '../../interfacees/project-content-item';
import { PopUpServiceService } from '../../pop-up-service.service';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../../user-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-project-contect-items',
  templateUrl: './my-project-contect-items.component.html',
  styleUrls: ['./my-project-contect-items.component.css']
})
export class MyProjectContectItemsComponent implements OnInit {
  // @Input() title!: string;
  @Input() hideProjectTh!: any;
  @Input() kindOfCard!: any;
  @Input() project!: any;
  @Input() workType!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];

  myCompProjectItem = new ProjectContentItemComponent(this.userService, this.appService, this.popUpService)
  systemGuid: any;
  updateDetails = false;
  ProjectContentItem: any;
  workingHours!: Number;
  massageToUser = "";
  ProjectItemToUpdate!: any;
  isPopUpOpen!: any;
  ifSortDown = true;
  selectedTime: any;
  massgeUserHeader = "";
  massgeUserBody = "האם אתה בטוח שברצונך למחוק דיווח זה?"
  massgeUserFooter = "";
  kindOfMassage = 'deleteProjectContentItem';
  projectContentItemGuid = "";
  myProjectContectItemArr!: any;
  showMassegeNoProjectContectItem = false;
  projectContentItem: any;
  showMassgeToUser = false;
  startWorkOfTask: any;

  constructor(private userService: UserServiceService, private datePipe: DatePipe, private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
    this.popUpService.getAllmyProjectContectItem().subscribe(res => {
      this.GetMyProjectContectItem(this.selectedTime)
    })
  }
  ngOnInit(): void {
    if (this.myProjectContectItemArr) {
      this.sortTableByDate();
    }
    this.GetMyProjectContectItem("2");

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
  GetMyProjectContectItem(selectedTime: any, fromDate = "", untilDate = "") {
    this.selectedTime = selectedTime;
    if (selectedTime) {
      this.systemGuid = localStorage.getItem('systemGuid')
      this.userService.GetMyProjectContectItem(this.systemGuid, selectedTime, fromDate, untilDate).subscribe(res => {
        if (res) {
          this.myProjectContectItemArr = res;
        }
      },
        err => {
          console.log(err.error);
        })
    }
  }
  toTimestamp(sortValue: any) {
    var datum = Date.parse(sortValue);
    return datum / 1000;
  }
  sortTableByDate() {
    this.myProjectContectItemArr.sort((a: any, b: any) => {
      const sortValueTimestampA = this.toTimestamp(a.CreatedOn);
      const sortValueTimestampB = this.toTimestamp(b.CreatedOn);
      return ((sortValueTimestampA ? sortValueTimestampA : new Date()) > (sortValueTimestampB ? sortValueTimestampB : new Date()) ? 1 : -1)
    })
  }

  UpdateProjectItemButton() {
    this.ProjectItemToUpdate = {
      Guid: this.ProjectContentItem.Guid,
      Description: this.ProjectContentItem.Description,
      ActualTime: this.workingHours,
      //BillableHours:form.value.BillingHours
    }
    this.userService.UpdateProjectContentItemDetails(this.ProjectItemToUpdate).subscribe(
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
      this.myProjectContectItemArr.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.myProjectContectItemArr?.sort((a: any, b: any) =>

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
      this.myProjectContectItemArr.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.myProjectContectItemArr?.sort((a: any, b: any) =>
        (keyToSort[1] < keyToSort[1]) ? 1 : -1)

    }
  }
  EditTaskIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
  }

  // EditProjectContentItemIcon(val: any) {
  //   this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
  //   this.ProjectContentItem = val;
  //   this.ProjectContentItem.Date = this.datePipe.transform(this.ProjectContentItem.Date, 'yyyy-MM-dd');
  // }
  // DeleteProjectContentItemIcon(ProjectContentItem: any) {
  //   this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
  //   this.projectContentItemGuid = ProjectContentItem.Guid;
  // }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
  }

}


