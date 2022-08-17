import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from '../../interfacees/project';
import { Task } from '../../interfacees/task';
import { ProjectContentItem } from '../../interfacees/project-content-item';
import { Regardingobjectid } from '../../interfacees/regardingobjectid';
import { WorkType } from '../../interfacees/work-type';
import { ProjectContentItemComponent } from '../project-content-item/project-content-item.component';
import { UserServiceService } from '../../user-service.service';
import swal from 'sweetalert';
import { AppService } from '../../app-service.service';
import { PopUpServiceService } from '../../pop-up-service.service';

@Component({
  selector: 'app-create-aproject-content-item',
  templateUrl: './create-aproject-content-item.component.html',
  styleUrls: ['./create-aproject-content-item.component.css']
})
export class CreateAprojectContentItemComponent implements OnInit {
  @Input() MyTask!: any;
  @Input() actualTime: any;
  @Input() KindPopUpUpdateProjectContectItemWithTime: any;
  @Input() projectContectItemByTimerGuid: any
  @Input() ifXt: any
  @Input() endButtonTimerContectProjectContectItem!: boolean
  @ViewChild("guidProject") guidProject!: ElementRef;
  ifX = true
  todayDate!: any;
  myDate = new Date()
  Project!: Project[];
  projectfilter: any
  WorkType!: WorkType[];
  Regarding!: Regardingobjectid[];
  ProjectContentItem!: any
  systemGuid: any;
  ProjectItem!: any
  taskGuid!: any
  projectGuid: any
  workTypeGuid: any;
  oneDate: any;
  subject1 = "";
  billingHours1 = ""
  project1 = "";
  ProjectContentItemWithTime: any;
  ProjectFilter: any;
  isDisabled = false;
  ProjectGuidValue: any;
  ProjectGuid: any;
  GuidProject: any
  // public data!: Array<Project>;
  constructor(private datePipe: DatePipe, private userServiceService: UserServiceService,
    private appService: AppService, private popUpService: PopUpServiceService) {
    this.isDisabled = false;
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.todayDate);
    this.popUpService.GetIfXProjectContectItemUpdateWithTime().subscribe(res => {
      if (res) {
        this.ifX = false
      }
    })
    this.popUpService.getIsDisabledBtn().subscribe(res => {
      if (res) {
        this.isDisabled = res
      }
    })
  }
  ngOnInit(): void {
    this.GetRegarding()
    this.GetProject()
    this.GetWorkType()
  }

  selectEvent(item:any) {
    // do something with selected item
    //לא למחוק חלק מPL הפרויקט
  }

  onChangeSearch(search: any) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e:any) {
    // do something
  }
  CreateNewProjectItem(form: NgForm) {
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') },
    console.log(this.ProjectGuidValue)
    form.value.Project = { "Guid":  form.value.Project.Guid },
      form.value.WorkType = { "Guid": form.value.workType.Guid }
    form.value.fromDate = this.datePipe.transform(form.value.oneDate, 'dd/MM/yyyy')
    form.value.untilDate = this.datePipe.transform(form.value.oneDate, 'dd/MM/yyyy')
    this.userServiceService.CreateNewProjectItem(form.value, form.value.fromDate, form.value.untilDate).subscribe
      (
        (res) => {

          this.ProjectContentItem = res;
          swal("!דיווח נוצר בהצלחה")
          // this.isDisabled = false;
          this.popUpService.setAllmyProjectContectItem(true)
          this.popUpService.SetWorkTimeAfterProjectContectItem(true)
          this.appService.setIsPopUpOpen(false);
          this.popUpService.setClosePopUp();
        },
        (err) =>
          swal(err.error))
    this.popUpService.setIsDisabledBtn(false)
  }

  GetRegarding() {
    this.userServiceService.GetRegarding().subscribe(
      (res: any) => {
        this.Regarding = res;
        console.log(this.Regarding);
      },
      (err: any) =>
        swal(err.error)
    )
  }

  GetWorkType() {
    this.userServiceService.GetWorkType().subscribe(
      (res: any) => {
        this.WorkType = res;
        console.log(this.WorkType);
      },
      (err: any) =>
        swal(err.error))
  }

  GetProject() {
    this.userServiceService.GetProject().subscribe(
      (res: any) => {
        this.Project = res;
        console.log(this.Project);
      },
      (err: any) =>
        swal(err.error))
  }

  UpdateProjectContectItemWithTime(form: NgForm) {
    this.projectContectItemByTimerGuid = localStorage.getItem("projectContectItemByTimerGuid")
    form.value.Guid = this.projectContectItemByTimerGuid
    form.value.OwnerId = { "Guid": localStorage.getItem('systemGuid') },
      form.value.Project =  { "Guid":  form.value.Project.Guid },
      form.value.WorkType = { "Guid": form.value.workType.Guid }
    form.value.ActualTime = this.actualTime

    this.userServiceService.UpdateProjectContectItemWithTime(form.value).subscribe(
      (res) => {
        this.ProjectContentItemWithTime = res;
        swal(this.ProjectContentItemWithTime)
        this.popUpService.setAllmyProjectContectItem(true)
        this.popUpService.SetWorkTimeAfterProjectContectItem(true)
        localStorage.removeItem("projectContectItemByTimerGuid")
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err) =>
        swal(err.error))

  }
  CreateOrUpdateProjectContectItem(form: NgForm) {
    if (this.KindPopUpUpdateProjectContectItemWithTime) {
      this.UpdateProjectContectItemWithTime(form)
    }
    else {
      this.CreateNewProjectItem(form)
    }
  }
  filter(value: any) {
    this.Project = this.Project.filter((f: Project) => f?.Name.includes(value));

  }
  SearchValue() {
    if (this.ProjectFilter != "") {
      this.Project = this.Project.filter((f: Project) => f?.Name.includes(this.ProjectFilter));
    }

  }
  onWorkTypeSelected(val: any) {
    console.log(val.target.value);
    if (val.target.value == "790556d1-2ada-ea11-a813-000d3a21015b") {
      this.subject1 = "הפסקות";
      this.billingHours1 = "2";
      this.project1 = "216003B0-9D6B-EC11-8943-000D3A38C560";


    }
    if (val.target.value == "00ee906b-6add-ea11-a813-000d3a21015b") {
      this.subject1 = "יום חופש";
      this.billingHours1 = "2";
      this.project1 = "216003B0-9D6B-EC11-8943-000D3A38C560";
    }
    if (val.target.value == "0c03dc7d-6add-ea11-a813-000d3a21015b") {
      this.subject1 = "יום מחלה";
      this.billingHours1 = "2";
      this.project1 = "216003B0-9D6B-EC11-8943-000D3A38C560";
    }
  }
}
