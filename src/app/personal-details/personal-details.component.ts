import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  systemName!: any;
  systemMail!: any;
  systemGuid!: any;
  @Input()ifX!:boolean;
  @Output() openPopUp = new EventEmitter<any>();
  @Output() closePersonalDetails = new EventEmitter<any>();

  constructor(public route:Router,  private appService: AppService,  private popUpService: PopUpServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.systemName = localStorage.getItem('systemName');
    this.systemMail = localStorage.getItem('systemMail');

  }
  LogOut()
  {
    localStorage.clear();
this.route.navigate(['/login'])
  }
  openPopUpp(data: string, type: boolean)
  {
    this.openPopUp.emit({date:data,type:type})
  }
  closePersonalDetailss()
  {
    this.closePersonalDetails.emit()
  }
}
