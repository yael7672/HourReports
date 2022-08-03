import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-hours-awaiting-approval',
  templateUrl: './hours-awaiting-approval.component.html',
  styleUrls: ['./hours-awaiting-approval.component.css']
})
export class HoursAwaitingApprovalComponent implements OnInit {
  systemGuid:any;
  hoursAwaitingApprovalArr:any;
  projectContentItemListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  thArrTableProjectContentItem = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  constructor(private userService:UserServiceService) { }
  ngOnInit(): void {
    this.GetHoursAwaitingApproval()
  }
  GetHoursAwaitingApproval()
  {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.userService.GetHoursAwaitingApproval(this.systemGuid).subscribe(res => {
      if (res) {
        this.hoursAwaitingApprovalArr = res;
        console.log(this.hoursAwaitingApprovalArr);
      }
    },
      err => {
        console.log(err.error);
      })
  }
}
