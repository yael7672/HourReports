import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {
  systemGuid: any;
  @Input()  ifTrIsNull!: boolean;
  @Input() ifShowCheckBox!: boolean;
  @Input() ifShowEmployeeProjectContentItem!: boolean;
  @Input() ifShowOpenEmployeeTask!: boolean;
  @Input() ifApproveReport!: boolean;
  @Input() ifUpdate!: boolean;
  @Input() ifUpdateTask!: boolean;
  @Input() ifShowOpenTask!: boolean;
  @Input() ifShowProjectContentItem!: boolean;
  @Input() ifDelete!: boolean;
  @Input() thArr: any;
  @Input() ifShowXorVIcons!: boolean;
  @Input() ifUpdateOpen: any
  @Input() ifDeleteOpen:any
  @Input() ifSortDown!: boolean
  @Input() tableData: any
  @Input() tableDataKeys: any
  @Input() hideSort: any
  @Input() showGraph: any
  @Input() ifShowAndEditTeamSetting!: boolean
  @Input() ifShowOpenTeamTask!: boolean
  @Input()ifCreateReport!: boolean;
  @Input() ifShowAndEditEmployeeSetting: any
  @Input() ifDeleteTask: any
  @Input() showMassgeToUserDeleteTask: any
  @Output() EditProjectContentItemIcon = new EventEmitter<any>();
  @Output() DeleteProjectContentItemIcon = new EventEmitter<any>();
  @Output() SortTableDown = new EventEmitter<any>();
  @Output() SortTableUp = new EventEmitter<any>();
  @Output() SelectedData = new EventEmitter<any>();
  @Output() ShowOpenTask = new EventEmitter<any>();
  @Output() ShowProjectContentItem = new EventEmitter<any>();
  @Output() ApproveReport = new EventEmitter<any>();
  @Output() EditTeamDetailsByAdmin = new EventEmitter<any>();
  @Output() ShowOpenTeamTask = new EventEmitter<any>();
  @Output() DeleteTaskIcon= new EventEmitter<any>();
  @Output() CreateReport= new EventEmitter<any>();
  @Output() EditEmployeeDetailsByAdmin = new EventEmitter<any>();
  ifDelete1 = true;
  ifUpdate1 = true
  ifAdmin: any;
  isChecked: boolean[] = [];
  showaApproveReportIcon: any;
  arrayOfReports: any[] = [];
  isPopUpOpen: any;
  arr: any = []
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private popUpService: PopUpServiceService, private appService: AppService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
    })
  }
  ngOnInit(): void {
    this.ifAdmin = localStorage.getItem('ifAdmin');
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
  }
  editProjectContentItemIcon(colData: any) {
    this.EditProjectContentItemIcon.emit(colData);
  }

  deleteProjectContentItemIcon(colData: any) {
    this.DeleteProjectContentItemIcon.emit(colData);
  }

  deleteTaskIcon(colData: any) {
    this.DeleteTaskIcon.emit(colData);
  }

  returnColDataByType(colData: any, tableDataKey: any) {
    if (tableDataKey && typeof tableDataKey === 'string') {
      return colData[tableDataKey]
    }
    else {
      if (colData[tableDataKey[0]]?.length >= 1) {
        this.arr = [];
        for (let i = 0; i < colData.TeamMemmber?.length; i++) {
          if (colData[tableDataKey[0]]) {
            this.arr += colData[tableDataKey[0]][i][tableDataKey[1]] + " , ";
          }
          else return null;
        }
        return this.arr;
      }
      else {
        if (colData[tableDataKey[0]]) {
          return colData[tableDataKey[0]][tableDataKey[1]]
        }
        else return null;
      }
    }
  }
  sortTableDown(th: any) {
    this.SortTableDown.emit(th);
  }
  sortTableUp(th: any) {
    this.SortTableUp.emit(th);
  }
  selectedData(val: any) {
    if (!this.ifUpdateOpen && !this.ifDeleteOpen) {
      this.SelectedData.emit(val);
    }
  }
  showOpenTask(val: any) {
    this.ShowOpenTask.emit(val);
  }
  showProjectContentItem(val: any) {
    this.ShowProjectContentItem.emit(val);
  }
  approveReport(val = null) {
    if (this.arrayOfReports.length > 0) {
      this.ApproveReport.emit(this.arrayOfReports)
    }
    else {
      this.ApproveReport.emit(val)
    }
  }
  checkValue(isChecked: any, data: any) {
    console.log(isChecked, data);
    if (isChecked) {
      this.arrayOfReports.push(data)
      console.log(this.arrayOfReports);
    }
    else {
      const index = this.arrayOfReports.indexOf(data);
      if (index > -1) {
        this.arrayOfReports.splice(index, 1);
        console.log(this.arrayOfReports);
      }
    }
  }
  showStatisticsGraphEmployeeDetailsToManager(val: any) {
    this.router.navigate(['/menuStatistics-Graph-Employee-Details-ToManager', val.EmployeeGuid])
    localStorage.setItem("EmployeeName",val.EmployeeName)
  }

  editEmployeeDetailsByAdmin(val: any) {
    this.EditEmployeeDetailsByAdmin.emit(val);
  }
  chooseAll(isChecked: any) {

  }
  showOpenTeamTask(val: any) {
    this.ShowOpenTeamTask.emit(val);
  }
  editTeamDetailsByAdmin(val: any) {
    this.EditTeamDetailsByAdmin.emit(val);
  }
  createReport(val:any)
    {
      this.CreateReport.emit(val);
    }
  
}