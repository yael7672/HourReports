import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {

  constructor() { }
  @Input() thArr: any
  @Input() tableData: any
  @Input() tableDataKeys: any
  @Output() EditProjectContentItemIcon = new EventEmitter<any>();
  @Output() DeleteProjectContentItemIcon = new EventEmitter<any>();
  ngOnInit(): void {
  }
  editProjectContentItemIcon(colData:any)
  {
    this.EditProjectContentItemIcon.emit(colData);
  }
  deleteProjectContentItemIcon(colData:any)
  {
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
  }}
