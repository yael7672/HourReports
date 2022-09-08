import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-massege-to-manager',
  templateUrl: './massege-to-manager.component.html',
  styleUrls: ['./massege-to-manager.component.css']
})
export class MassegeToManagerComponent implements OnInit {

  constructor(private appService:AppService, private popUpService:PopUpServiceService) { }

  ngOnInit(): void {
  }
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }
}
