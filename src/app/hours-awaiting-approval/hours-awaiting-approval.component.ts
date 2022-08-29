import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-hours-awaiting-approval',
  templateUrl: './hours-awaiting-approval.component.html',
  styleUrls: ['./hours-awaiting-approval.component.css']
})
export class HoursAwaitingApprovalComponent implements OnInit {
  isPopUpOpen!: any;
  systemGuid: any;
  projectContentItemGuid: any;
  projectContentItem: any;
  showMassgeToUser: any;
  hoursAwaitingApprovalArr: any;
  deleteProjectContentItem: any;
  updateProjectContentItemDetails = false
  projectContentItemListKeys = ['Name', 'Date', 'ManagerNotes', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'הערות מנהל', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
    })
  }
  ngOnInit(): void {
    this.GetHoursAwaitingApproval()
  }
  GetHoursAwaitingApproval() {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.userService.GetHoursAwaitingApproval(this.systemGuid).subscribe(res => {
      if (res) {
        this.hoursAwaitingApprovalArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  editProjectContentItemIcon(val: any) {
    this.popUpService.setSpecificPopUp(true, 'UpdateProjectContentItemDetails');
    this.updateProjectContentItemDetails = true;
    this.projectContentItem = val;
  }
  deleteProjectContentItemIcon(ProjectContentItem: any) {
    this.popUpService.setSpecificPopUp(true, 'DeleteProjectContentItemIcon');
    this.showMassgeToUser = true;
    this.projectContentItemGuid = ProjectContentItem.Guid;
    this.deleteProjectContentItem = true;
  }
}
