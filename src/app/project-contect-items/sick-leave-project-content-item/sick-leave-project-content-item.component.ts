import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { PopUpServiceService } from '../../pop-up-service.service';
import { UserServiceService } from '../../user-service.service';

@Component({
  selector: 'app-sick-leave-project-content-item',
  templateUrl: './sick-leave-project-content-item.component.html',
  styleUrls: ['./sick-leave-project-content-item.component.css']
})
export class SickLeaveProjectContentItemComponent implements OnInit {
  @Input() workType!: any[];
  @Input() myTask: any;
  @Input() project: any;
  @Input() todayDate: any;
  dateOne: any;
  dateTwo: any;
  isChecked!: boolean;
  ifBetweenDates = false;
  showInputsDates = false;
  kindOfMassage = 'checkIfIsReportOnThisDate';
  subjectTask = "חופשת מחלה"
  hoursActually = "9";
  massage = "";
  showMassgeToUser = false;
  massgeUserHeader = "!שים לב";
  massgeUserBody = "קיימים דיווחים על התאריכים הנבחרים";
  massgeUserFooter = "?האם ברצונך להמשיך";
  fromDate: any;
  untilDate: any;
  projectContentItemToCreate: any;
  systemGuid: any;
  MyProjectContectItemArr: any;
  isDisabled = false;
  constructor(private userService: UserServiceService, private datepipe: DatePipe, private appService: AppService, private popUpService: PopUpServiceService) { }
  ngOnInit(): void {
  }
  checkValue(val: any) {
    if (val == true) {
      this.showInputsDates = true;
      this.ifBetweenDates = true;
    } else {
      this.showInputsDates = false;
      this.ifBetweenDates = false;

    }
  }
  CreateNewSickLeaveProjectItem(form: NgForm) {
    this.isDisabled = true;
    form.value.Name = "חופשת מחלה";
    if (!form.value.ActualTime)
      form.value.ActualTime = "9"

    form.value.WorkType = { "Guid": "0C03DC7D-6ADD-EA11-A813-000D3A21015B" }
    form.value.Project = { "Guid": "216003B0-9D6B-EC11-8943-000D3A38C560" }
    form.value.BillableHours = "2";
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') }
    if (this.isChecked) {
      this.fromDate = this.datepipe.transform(form.value.fromDate, 'dd/MM/yyyy')
      this.untilDate = this.datepipe.transform(form.value.untilDate, 'dd/MM/yyyy')
    }
    else {
      this.fromDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
      this.untilDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
    }
     form.value.MoreEmployee=[]
    this.projectContentItemToCreate = form.value;
    this.checkIfIsReportOnThisDate()
  }
  checkIfIsReportOnThisDate() {
    this.systemGuid = localStorage.getItem('systemGuid')
    this.userService.GetMyProjectContectItem(this.systemGuid, 5, this.fromDate, this.untilDate,"").subscribe(res => {
      if (res) {
        this.MyProjectContectItemArr = res;
        if (this.MyProjectContectItemArr.length > 0) {
          this.showMassgeToUser = true;
        }
        else {
          this.CreateNewProjectItem()
          this.showMassgeToUser = false;
        }
      }
    },
      err => {
        console.log(err.error);
      })
  }
  CreateNewProjectItem() {
    this.userService.CreateNewProjectItem(this.projectContentItemToCreate, this.fromDate, this.untilDate).subscribe(
      (res) => {
        this.massage = res;
        swal(this.massage)
        this.popUpService.setAllmyProjectContectItem(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
      {        
        swal(err.error);
        this.isDisabled = true;
      }
    )
  }
  clickYes(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.CreateNewProjectItem()
    }
  }
  clickNo(kindOfMassage: string) {
    if (kindOfMassage = 'checkIfIsReportOnThisDate') {
      this.showMassgeToUser = false;
      this.isDisabled = false;

    }
  }
}
