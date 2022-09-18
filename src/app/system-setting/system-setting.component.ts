import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {
 titleSystemSetting="הגדרות מערכת"
 isPopUpOpen :any;
 isDisabled = false;

 constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService) {
   this.popUpService.getKindOfPopUp().subscribe(res => {
     this.isPopUpOpen = res;
     console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
   }) 
  }
  ngOnInit(): void {
  }
  ifX=true
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }
  openPopUp(data: string, type: boolean) {
        this.appService.setIsPopUpOpen(true);
        this.popUpService.setSpecificPopUp(type, data)
  }
}