import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { PopUpServiceService } from '../pop-up-service.service';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-my-project-contect-items',
  templateUrl: './my-project-contect-items.component.html',
  styleUrls: ['./my-project-contect-items.component.css']
})
export class MyProjectContectItemsComponent implements OnInit {
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  workingHours!: Number;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  myCompProjectItem = new ProjectContentItemComponent(this.userServiceService, this.appService, this.popUpService)
  systemGuid: any;

  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) { }
  MyProjectContectItemArr!: ProjectContentItem[]
  ngOnInit(): void {
  }

  returnColDataByType(colData: any, tableDataKey: any) {
    this.myCompProjectItem.returnColDataByType(colData, tableDataKey)
  }

  EditProjectContentItemIcon(colData:any){
    this.myCompProjectItem.EditProjectContentItemIcon(colData)

  }

    openPopUp(data: string, type: boolean) {
      this.appService.setIsPopUpOpen(true);
      this.popUpService.setSpecificPopUp(type, data)
 
  }
  GetMyProjectContectItem(selectedTime:any){
    this.getDataClickOfButton.emit(selectedTime);
    // this.userServiceService.GetMyProjectContectItem(this.systemGuid,selectedTime).subscribe(res => {
    //   if (res) {
    //     this.MyProjectContectItemArr = res;
    //     this.tableData = this.MyProjectContectItemArr
    //     console.log("MyProjectContectItemArr" +this.MyProjectContectItemArr);
    //   }
    // },
    //   err => {
    //     console.log(err.error);
    //   })
  }
}
