import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app-service.service';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-show-my-task',
  templateUrl: './show-my-task.component.html',
  styleUrls: ['./show-my-task.component.css']
})
export class ShowMyTaskComponent implements OnInit {

  constructor() { }

  taskDateRecords: any;
  @Input() hideProjectTh!: Boolean;
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  IftableDataKeyIdProject!:boolean;
  ngOnInit(): void {
  }
  SelectedData(val: object) {
    this.taskDateRecords = val;
    this.clickSelectedTask.emit(this.taskDateRecords)
  }
  clickOfButton(kindOfButton: string, type: boolean) {
    this.getDataClickOfButton.emit({ "kind": kindOfButton, "type": type })
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
  SortTable(thName:any){
    let keyToSort="";
    switch (thName) {
        case 'נוצר ב:':
          keyToSort='CreatedOn';
          break;
          case    'שעות מוקצות למשימה':
            keyToSort= 'WorkingHours';
            break;
        
            case 'תאריך יעד':
              keyToSort=  'ScheduledEndDate';
              break;
              case 'פרוייקט':
                keyToSort=  'Project';
                break;
                case 'שם המשימה':
                  keyToSort=  'Subject';
                  break;
                  case 'עדיפות':
                    keyToSort=  'ScheduledEndDate';
                    break;
      default:
        break;
    }
    this.tableData.sort((a:any,b:any)=>
         (a[keyToSort]>( b[keyToSort]))?1:-1)
  }  
}
// thArrTask = ['שם המשימה', 'נוצר ב:','פרוייקט' ,'שעות מוקצות למשימה','תאריך יעד'];

// taskListKeys = ['Subject', 'CreatedOn', ['Project', 'Name'],'WorkingHours','ScheduledEndDate'];
// 