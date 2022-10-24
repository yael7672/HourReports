import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-project-contect-item-by-project',
  templateUrl: './project-contect-item-by-project.component.html',
  styleUrls: ['./project-contect-item-by-project.component.css']
})
export class ProjectContectItemByProjectComponent implements OnInit {
  tabLink!: any[]
  id: any;
  selectDate: any
  systemGuid: any
  fromDate: any;
  untilDate: any;
  todayDate!: any;
  myDate = new Date()
  fileName: any

  ProjectContectItemByProjectArr!: ProjectContentItem[]
  thArrTableProjectContentItemByProject = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  projectContentItemByProjectListKeys = ['Name', 'Date', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];

  constructor(public activatedRoute: ActivatedRoute, private userService: UserServiceService, private datePipe: DatePipe) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tabLink = [
      { title: 'פריטי תכולת פרויקט לפי פרויקט', fragment: '/menu/project-contect-item-by-project/' + this.id },
      { title: 'כללי', fragment: '/menu/specific-project-details/' + this.id },
    ];
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.untilDate = this.todayDate
    this.fromDate = this.todayDate

  }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem("systemGuid")
    this.GetProjectContectItemByProjectAndBySystemUser("1")
    this.fileName = "דיווחי שעות"
  }
  selectTimeProjectContectItemByProject(val: any) {
    if (val == "2" || val == "3" || val == "4" || val == "5") {
      this.GetProjectContectItemByProjectAndBySystemUser(val)
      this.selectDate = false

    }
    if (val == "") {
      this.GetProjectContectItemByProjectAndBySystemUser(1)
      this.selectDate = false
    }
    if (val == "5") {
      this.selectDate = true
    }
  }


  async GetProjectContectItemByProjectAndBySystemUser(SelectedTime: any) {
    this.userService.GetProjectContectItemByProjectAndBySystemUser(this.systemGuid, this.id, SelectedTime, "", "").then(res => {
      if (res) {
        this.ProjectContectItemByProjectArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }

  SortProjectProjectContectItemyDateRange(val: any) {
    if (this.fromDate && this.untilDate != null && this.fromDate && this.untilDate != "") {
      let d1 = new Date(this.fromDate);
      let d2 = new Date(this.untilDate)
      if (d1.getTime() <= d2.getTime()) {
        this.untilDate = this.datePipe.transform(this.untilDate, 'dd/MM/yyyy')
        this.fromDate = this.datePipe.transform(this.fromDate, 'dd/MM/yyyy')
        // this.GetEmployeeDetails(this.systemGuid, this.fromDate, this.untilDate, 1)
      }
      else {
        swal('!תאריך התחלה לא יכול להיות גדול מתאריך סיום')
      }
    }
    else {
      swal('עליך להזין תאריך התחלה ותאריך סיום')
    }
  }

  ExportDataProjectContectItemToExcel() {

  }
}
