import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  isClose!:boolean
  @Input()text!:string;
  @Input()ifX!:boolean;

  constructor(private popUpService:PopUpServiceService,private appService:AppService) { }

  ngOnInit(): void {
  }
  closePopUp()
  {   
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
  }
}
