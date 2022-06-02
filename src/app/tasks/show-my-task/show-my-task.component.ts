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

  heberwDateRecords: any;
  @Input()hideProjectTh!:Boolean;
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output()getDataClickOfButton = new EventEmitter<any>();

  ngOnInit(): void {
  }
  SelectedData(val: object) {
    this.heberwDateRecords = val;
    this.clickSelectedTask.emit(this.heberwDateRecords)
  }
  clickOfButton(kindOfButton:string,type:boolean)
  {
    this.getDataClickOfButton.emit({"kind":kindOfButton,"type":type})
  }
}
