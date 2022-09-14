import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {
 titleSystemSetting="הגדרות מערכת"
  constructor(private appService:AppService, private popUpService:PopUpServiceService) { }
 
  ngOnInit(): void {
  }
  ifX=true
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }


  
}
