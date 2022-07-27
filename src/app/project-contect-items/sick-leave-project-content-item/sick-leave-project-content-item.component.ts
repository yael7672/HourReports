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
  showInputsDates = false;
  subjectTask = "חופשת מחלה"
  hoursActually = "9";
  massage = ""
  constructor(private userService: UserServiceService, private datepipe: DatePipe, private appService: AppService, private popUpService: PopUpServiceService) { }
  ngOnInit(): void {
  }
  checkValue(val: any) {
    if (val == true) {
      this.showInputsDates = true;
    } else {
      this.showInputsDates = false;
    }
  }
  CreateNewSickLeaveProjectItem(form: NgForm) {
    if (form.value.WorkType == "")
      form.value.WorkType = { "Guid": "DDB877AB-440B-ED11-82E4-000D3ABEE42C" }
    if (form.value.Project == "")
      form.value.Project = { "Guid": "27481F75-440B-ED11-82E4-000D3ABEE42C" }
    if (form.value.BillableHours == "")
      form.value.BillableHours = "2";
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') }
    if (this.isChecked) {
      form.value.fromDate = this.datepipe.transform(form.value.fromDate, 'dd/MM/yyyy')
      form.value.untilDate = this.datepipe.transform(form.value.untilDate, 'dd/MM/yyyy')
    }
    else {
      form.value.fromDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
      form.value.untilDate = this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
    }
    console.log(form.value);
    this.userService.CreateNewProjectItem(form.value, form.value.fromDate, form.value.untilDate).subscribe(
      (res) => {
        this.massage = res;
        swal(this.massage)
        this.popUpService.setAllmyProjectContectItem(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        swal(err.error)
    )
  }


}
  //  OwnerId: { "Guid": localStorage.getItem('systemGuid') },
  //     Name: form.value.Subject,
  //     Project: { "Guid": this.projectGuid },
  //     CustomTask: { "TaskGuid": this.taskGuid },
  //     WorkType: { "Guid": this.workTypeGuid },