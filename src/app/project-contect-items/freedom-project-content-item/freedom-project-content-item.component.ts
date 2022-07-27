import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @Input() workType!: any[];
  @Input() myTask: any;
  @Input() project: any;
  @Input() todayDate: any;
  showInputsDates = false;
  dateOne: any;
  dateTwo: any;
  subjectTask = "יום חופש"
  hoursActually = "9";
  massage = ""
  isChecked!: boolean;
  constructor(private userService: UserServiceService, private appService: AppService, private popUpService: PopUpServiceService,
    private datepipe:DatePipe) { }
  ngOnInit(): void {
  }
  checkValue(val: any) {
    if (val == true) {
      this.showInputsDates = true;
    } else {
      this.showInputsDates = false;
    }
  }
  CreateNewFreedomProjectItem(form: NgForm) {
    if (form.value.WorkType == "")
      form.value.WorkType = { "Guid": "AA40AB76-520B-ED11-82E4-000D3ABEEDFD" }
    if (form.value.Project == "")
      form.value.Project = { "Guid": "91510FCF-140B-ED11-82E4-000D3ABEE224" }
    if (form.value.BillableHours == "")
      form.value.BillableHours = "2";
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') }
    if(this.isChecked)
    {
      form.value.fromDate=this.datepipe.transform(form.value.fromDate, 'dd/MM/yyyy')
      form.value.untilDate=this.datepipe.transform( form.value.untilDate, 'dd/MM/yyyy')
    }else{
      form.value.fromDate=this.datepipe.transform(form.value.oneDate, 'dd/MM/yyyy')
      form.value.untilDate=this.datepipe.transform( form.value.oneDate, 'dd/MM/yyyy')
    }
    

      console.log(form.value);
    this.userService.CreateNewProjectItem(form.value,form.value.fromDate,form.value.untilDate).subscribe(
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
