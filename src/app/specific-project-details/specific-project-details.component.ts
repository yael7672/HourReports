import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-specific-project-details',
  templateUrl: './specific-project-details.component.html',
  styleUrls: ['./specific-project-details.component.css']
})
export class SpecificProjectDetailsComponent implements OnInit {
  todayDate:any;
  myDate = Date.now()
  constructor(private userService: UserServiceService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute) { 
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }
  thArrProjectContectItemList = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  ProjectListKeys = ['Name', 'CreatedOn', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  systemGuid: any;
  ProjectContentItemArr!: ProjectContentItem[];
  projectGuid: any;
  selectedTime: any;
  FromDate: any;
  UntilDate: any;
  showCompareDates=false

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');;
    this.projectGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetProjectContectItemByProjectAndBySystemUser("1", "", "")
  }

  SortProjectContectItemByDateRange(){
    if (this.FromDate && this.FromDate != null && this.UntilDate && this.UntilDate != "") {
      this.showCompareDates=true

      let fromDate = new Date(this.FromDate);
      let untilDate = new Date(this.UntilDate)
      if (fromDate.getTime() <= untilDate.getTime()) {
        this.UntilDate = this.datePipe.transform(this.UntilDate, 'dd/MM/yyyy')
        this.FromDate = this.datePipe.transform(this.FromDate, 'dd/MM/yyyy')
        this.GetProjectContectItemByProjectAndBySystemUser("5", this.FromDate, this.UntilDate)
      }}
  }

  SelectTimeProjectContectItemByProject(val: any) {
    if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5) {
      this.showCompareDates=false
      this.GetProjectContectItemByProjectAndBySystemUser(val, "", "")
    }
    if (val == 5) {
      this.GetProjectContectItemByProjectAndBySystemUser(1, "", "")
      this.showCompareDates=true
    }

  }

    GetProjectContectItemByProjectAndBySystemUser(selectedTime: any, FromDate: any, UntilDate: any) {
      this.userService.GetProjectContectItemByProjectAndBySystemUser(this.systemGuid, this.projectGuid, selectedTime, FromDate, UntilDate).then(res => {
        if (res) {
          this.ProjectContentItemArr = res;
        }
      },
        err => {
          console.log(err.error);
        })
    }

    ExportToExcelPage()
    {
      
    }
  }
