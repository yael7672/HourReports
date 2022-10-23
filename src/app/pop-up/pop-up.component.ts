import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() title!: string;
  @Input() ifX!: boolean;
  @Input() ifXt!: boolean;
  @Input() hideButton!: any;
  @Input() textButtonBack: any;
  @Output() ClickCancel = new EventEmitter<any>();
  whichPopUpOpen: any;
  constructor(private popUpService: PopUpServiceService, private appService: AppService) {
     this.popUpService.getKindOfPopUp().subscribe(res => {
      this.whichPopUpOpen = res;
    }) }
  ngOnInit(): void {
  }
  closePopUp() {
    
   if(this.whichPopUpOpen.ProjectContentItemBySpesificDate)
   {
    this.popUpService.setDetailsOfWorkingHoursEmployee(true);
    this.popUpService.setDetailsOfWorkingHoursEmployeeForAdmin(true);
   }
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
  }
  CancelPopUp() {
    this.ClickCancel.emit('')
  }
}
