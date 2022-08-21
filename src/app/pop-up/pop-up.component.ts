import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  isClose!:boolean
  @Input()title!:string;
  @Input()ifX!:boolean;
  @Input() hideButton!: any; 
  @Input() textButtonBack:any;
  constructor(private popUpService:PopUpServiceService,private appService:AppService) { }
  ngOnInit(): void {
    console.log("popUpLoaded");
  }
  closePopUp()
  {   
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }
}
