import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {
  systemGuid: any;
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
  @Input() ifUpdateOpen: any
  @Input() ifSortDown!: boolean
  @Input() tableData: any
  @Input() tableDataKeys: any
  @Output() EditProjectContentItemIcon = new EventEmitter<any>();
  @Output() DeleteProjectContentItemIcon = new EventEmitter<any>();
  @Output() SortTableDown = new EventEmitter<any>();
  @Output() SortTableUp = new EventEmitter<any>();
  @Output() SelectedData = new EventEmitter<any>();
  @Output() ShowOpenTask = new EventEmitter<any>();
  @Output() ShowProjectContentItem = new EventEmitter<any>();
  @Output() ApproveReport = new EventEmitter<any>();

  ifDelete1 = true;
  ifUpdate1 = true
  ifAdmin: any;
  isChecked: boolean[] = [];
  showaApproveReportIcon: any;
  arrayOfReports: any[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }
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
  approveReport(val: any) {
    if (this.arrayOfReports.length > 0) {
      this.ApproveReport.emit(this.arrayOfReports)
    } else {
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
}