import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-freedom-project-content-item',
  templateUrl: './freedom-project-content-item.component.html',
  styleUrls: ['./freedom-project-content-item.component.css']
})
export class FreedomProjectContentItemComponent implements OnInit {
  @Input() MyProjectContectItemArr!: any[];
  @Input() workType!: any[];
  @Input() myTask: any;
  @Input() project: any;
  @Input() todayDate: any;
  @Output() GetMyProjectContectItem = new EventEmitter<any>();
  showInputsDates = false;
  dateOne: any;
  dateTwo: any;
  subjectTask = "יום חופש"
  hoursActually = "9";
  massage = ""
  isChecked!: boolean;
  ifBetweenDates = false;
  fromDate: any;
  untilDate: any
  kindOfMassage = 'checkIfIsReportOnThisDate';
  systemGuid: any;
  showMassgeToUser = false;
  massgeUserHeader = "!שים לב";
  massgeUserBody = "קיימים דיווחים על התאריכים הנבחרים"
  massgeUserFooter = "?האם ברצונך להמשיך";
  isDisabled = false;
  thArrTableProjectContentItem = ['שם', 'תאריך'];
  projectContentItemListKeys = ['Name', 'Date'];
  projectContentItemToCreate: any;
  ifShowSpinner!: boolean;
  constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService,
    private datepipe: DatePipe) {
    this.appService.getSpinner().subscribe(res => {
      this.ifShowSpinner = res;
    })
  }

  ngOnInit(): void {
  }
  checkValue(val: any) {
    if (val == true) {
      this.showInputsDates = true;
      this.ifBetweenDates = true
    }
    else {
      this.showInputsDates = false;
      this.ifBetweenDates = false;

    }
  }
  CreateNewFreedomProjectItem(form: NgForm) {
    this.appService.setSpinner(true);
    if (this.isChecked) {
      if (this.fromDate && this.untilDate != null && this.fromDate && this.untilDate != "") {
        let d1 = new Date(this.fromDate);
        let d2 = new Date(this.untilDate)
        if (d1.getTime() <= d2.getTime()) {
          this.fromDate = this.datepipe.transform( this.fromDate, 'dd/MM/yyyy')
          this.untilDate = this.datepipe.transform(this.untilDate, 'dd/MM/yyyy')
        }
        else {
          swal('!תאריך התחלה לא יכול להיות גדול מתאריך סיום');
          this.appService.setSpinner(false);
          return;
        }
      }
      else {
        swal('!עליך להזין תאריך התחלה ותאריך סיום')
        this.appService.setSpinner(false);
        return;
      }
    }
    else {
      this.fromDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
      this.untilDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
    }
    this.isDisabled = true;
    form.value.Name = "יום חופש";
    if (!form.value.ActualTime)
    form.value.ActualTime = "9"
    form.value.WorkType = { "Guid": "00EE906B-6ADD-EA11-A813-000D3A21015B" }
    form.value.Project = { "Guid": "216003B0-9D6B-EC11-8943-000D3A38C560" }
    form.value.BillableHours = "2";
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') }
    form.value.MoreEmployee = []
    this.projectContentItemToCreate = form.value;
    this.checkIfIsReportOnThisDate()
  }
  CreateNewProjectItem() {
    this.appService.setSpinner(true);
    this.userService.CreateNewProjectItem(this.projectContentItemToCreate, this.fromDate, this.untilDate).subscribe(
      (res) => {
        this.appService.setSpinner(false);
        this.massage = res;
        this.fromDate ="";
        this.untilDate ="";
        swal(this.massage);
        this.popUpService.setAllmyProjectContectItem(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) => {
        this.appService.setSpinner(false);
        swal(err.error)
        this.isDisabled = false;
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
      this.fromDate ="";
      this.untilDate ="";

    }
  }
  checkIfIsReportOnThisDate() {
    this.systemGuid = localStorage.getItem('systemGuid');
    debugger
    this.userService.GetMyProjectContectItem(this.systemGuid, 5, this.fromDate, this.untilDate, "").subscribe(res => {
      if (res) {
        this.appService.setSpinner(false);
        this.MyProjectContectItemArr = res;
        console.log(this.MyProjectContectItemArr);

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
        this.appService.setSpinner(false);
        console.log(err.error);              swal("error!",err.error,"error");
      })

  }

}
