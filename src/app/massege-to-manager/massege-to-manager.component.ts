import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-massege-to-manager',
  templateUrl: './massege-to-manager.component.html',
  styleUrls: ['./massege-to-manager.component.css']
})
export class MassegeToManagerComponent implements OnInit {
  todayDate: any;
  myDate = new Date()

  constructor(private route: Router, private appService: AppService, private popUpService: PopUpServiceService, private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
  }
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
    console.log("ClosePopUp");
  }
  linkToEmployeeReport() {
    this.route.navigate(['employee-report'])
    this.closePopUp()
  }
}
