import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import swal from 'sweetalert';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-delete-project-content-item',
  templateUrl: './delete-project-content-item.component.html',
  styleUrls: ['./delete-project-content-item.component.css']
})
export class DeleteProjectContentItemComponent implements OnInit {
  @Input() projectContentItemGuidOrTaskGuid: any
  ifSortDown = true;
  showMassgeToUser = true;
  massgeUserHeader = "";
  massgeUserBody = "האם אתה בטוח שברצונך למחוק דיווח זה?"
  massgeUserFooter = "";
  kindOfMassage = 'deleteProjectContentItem';
  massageToUser = "";
  ifShowSpinner!:boolean;
  @Input() projectContentItemGuid:any
  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
    this.appService.getSpinner().subscribe(res => {
      this.ifShowSpinner = res;
    })
  }
  ngOnInit(): void {
  }
  clickYes(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.DeleteProjectContentItemByGuid()
    }
  }
  DeleteProjectContentItemByGuid() {
    this.appService.setSpinner(true);
    this.userServiceService.DeleteProjectContentItemByGuid(this.projectContentItemGuidOrTaskGuid).subscribe(
      (res) => {
        this.appService.setSpinner(false);
        this.massageToUser = res;
        swal(this.massageToUser)
        this.showMassgeToUser = false;
        this.popUpService.setAllmyProjectContectItem(true)
        this.popUpService.setClosePopUp();
        this.popUpService.SetProjectContentItemByTaskGuid(true);

      },
      (err) =>{
        swal(err.error)
        this.appService.setSpinner(false);
      })
  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.showMassgeToUser = false; 
      this.popUpService.setClosePopUp();
    }
  }
}
