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
  @Input() ifShowEmployeeProjectContentItem!:boolean;
  @Input() ifShowOpenEmployeeTask!:boolean;
   @Input() ifApproveReport!:boolean;
  @Input() ifUpdate!: boolean;
  @Input() ifUpdateTask!: boolean;
  @Input() ifShowOpenTask!: boolean;
  @Input() ifShowProjectContentItem!: boolean;
  @Input() ifDelete!: boolean;
  @Input() thArr: any;
  @Input() ifUpdateOpen: any
  @Input() ifSortDown!: boolean
  @Input() tableData: any
  @Input() tableDataKeys: any
  @Input() hideSort:any
  @Input() showGraph:any
  @Input() ifShowAndEditEmployeeSetting:any
  @Output() EditProjectContentItemIcon = new EventEmitter<any>();
  @Output() DeleteProjectContentItemIcon = new EventEmitter<any>();
  @Output() SortTableDown = new EventEmitter<any>();
  @Output() SortTableUp = new EventEmitter<any>();
  @Output() SelectedData = new EventEmitter<any>();
  @Output() ShowOpenTask = new EventEmitter<any>();
  @Output() ShowProjectContentItem = new EventEmitter<any>();
  @Output() EditEmployeeDetailsByAdmin= new EventEmitter<any>();
  ifDelete1 = true;
  ifUpdate1 = true
  ifAdmin: any;
  showaApproveReportIcon: any;
  isPopUpOpen: any;

  constructor(private activatedRoute: ActivatedRoute,private router:Router,private popUpService:PopUpServiceService,private appService:AppService) { 
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
  sortTableDown(th: any) {
    this.SortTableDown.emit(th);
  }
  sortTableUp(th: any) {
    this.SortTableUp.emit(th);
  }
  selectedData(val: any) {
    if (!this.ifUpdateOpen) {
      this.SelectedData.emit(val);
    }
  }
  showOpenTask(val: any) {
    this.ShowOpenTask.emit(val);
  }
  showProjectContentItem(val: any) {
    this.ShowProjectContentItem.emit(val);
  }
  approveReport(val:any)
  {

  }
  showStatisticsGraphEmployeeDetailsToManager(val: any){
    this.router.navigate(['/Statistics-Graph-Employee-Details-ToManager', val.EmployeeGuid])
  }

  editEmployeeDetailsByAdmin(val: any){
    this.EditEmployeeDetailsByAdmin.emit(val);
  }
}