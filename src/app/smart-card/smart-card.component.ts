import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { ButtonWorkingTaskService } from '../button-working-task.service';
import { MenuComponent } from '../menu/menu.component';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-smart-card',
  templateUrl: './smart-card.component.html',
  styleUrls: ['./smart-card.component.css']
})
export class SmartCardComponent implements OnInit {
  TaskGuidFromLS:any
  menuCompo:any
  constructor(public router: Router,
    private popUpService: PopUpServiceService,
    private userService: UserServiceService,
    private appService: AppService, private buttonWorkingTaskService: ButtonWorkingTaskService, private datePipe: DatePipe) {
    // this.popUpService.GetProjectContentItemByTaskGuid().subscribe(res => {
    //   if(res)
    //   {
    //   this.TaskGuidFromLS = localStorage.getItem("TaskGuid")
    //   this.menuCompo=new MenuComponent(this.router,this.popUpService,this.userService,this.appService
    //     ,this.buttonWorkingTaskService,this.datePipe)
    //     this.menuCompo.GetProjectContentItemByTaskGuid(this.TaskGuidFromLS)
    // }})
   }
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  @Input()title!:string;
  @Input()arrFunc:any;
  @Input()nameOfFunc:any;
  @Input()sizeOfCard:any;
  @Input()ifX:any;
  @Input()textButtonBackToMyTask:any;
  @Input() isDisabledStart!: any;
  @Input() textButtonBack!: any;
  @Output() clickBackToMyTask= new EventEmitter<any>();
  @Output()clickCloseCard = new EventEmitter<any>();
  @Output()clickStartTimer = new EventEmitter<any>();
  @Output()clickPauseTimer = new EventEmitter<any>();
  @Output()clickdeleteTimer = new EventEmitter<any>();

  ngOnInit(): void {
  }
  closeCard()
  {
    this.clickCloseCard.emit();
  }
  
  backToMyTask()
  {
    this.clickBackToMyTask.emit();
  }
}
