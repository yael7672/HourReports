import { Component, Input, OnInit } from '@angular/core';
import  swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  @Input() TaskGuid:any
  massageToUser: any;
  showMassgeToUserDeleteTask=true;
  ifSortDown = true;
  massgeUserHeader = "";
  massgeUserBody = "האם אתה בטוח שברצונך למחוק משימה זו?"
  massgeUserFooter = "";
  kindOfMassage = 'deleteTask';
  // massageToUser = "";

  constructor(private userServiceService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
  }

  ngOnInit(): void {
  }
  clickYes(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.DeleteTaskByGuid()
    }
  }
  DeleteTaskByGuid() {
    this.userServiceService.DeleteTaskByGuid(this.TaskGuid).subscribe(
      (res) => {
        this.massageToUser = res;
        swal(this.massageToUser)
        this.showMassgeToUserDeleteTask = false;
        this.popUpService.setAllmyTask(true)
        this.popUpService.setClosePopUp();
        // this.popUpService.SetProjectContentItemByTaskGuid(true);

      },
      (err) =>
        swal(err.error))
  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.showMassgeToUserDeleteTask = false; 
      this.popUpService.setClosePopUp();
    }
  }
}
