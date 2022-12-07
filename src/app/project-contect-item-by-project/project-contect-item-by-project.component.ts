import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { UserServiceService } from '../user-service.service';
import * as XLSX from 'xlsx'; 

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
  EmployeeGuid: any;

  constructor(public activatedRoute: ActivatedRoute, private userService: UserServiceService, private datePipe: DatePipe) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.EmployeeGuid = this.activatedRoute.snapshot.paramMap.get('userId');

    this.tabLink = [
      { title: 'פריטי תכולת פרויקט לפי פרויקט', fragment: '/menu/project-contect-item-by-project/' + this.id  +'/'+ this.EmployeeGuid },
      { title: 'כללי', fragment: '/menu/specific-project-details/' + this.id  +'/'+  this.EmployeeGuid},
    ];
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.untilDate = this.todayDate
    this.fromDate = this.todayDate
    
  }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem("systemGuid")

    this.GetProjectContectItemByProjectAndBySystemUser("1")
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
    this.userService.GetProjectContectItemByProjectAndBySystemUser(this.EmployeeGuid, this.id, SelectedTime, "", "").then(res => {
      if (res) {
        this.ProjectContectItemByProjectArr = res;
      }
    },
      err => {
        console.log(err.error);         
             swal("error!",err.error,"error");
      })
  }

  SortProjectProjectContectItemyDateRange(dates: any) {
    
  //  this.GetEmployeeDetails(this.systemGuid, dates.fromDate, dates.untilDate, 1)

  }

  ExportDataProjectContectItemToExcel() {
    let element = document.getElementById('excel-table'); 
    element?.style.backgroundColor == 'pink'
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    this.fileName= 'ExcelSheet.xlsx'; 
    XLSX.writeFile(wb, this.fileName);
  }
  ExportDataProjectContectItemToExcel2() {

  }
}
