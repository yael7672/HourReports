import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { Acccount } from '../interfacees/Acccount';
import { ownerid } from '../interfacees/ownerid';
import { ProjectType } from '../interfacees/ProjectType';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-project-by-manager',
  templateUrl: './add-project-by-manager.component.html',
  styleUrls: ['./add-project-by-manager.component.css']
})
export class AddProjectByManagerComponent implements OnInit {
  todayDate: any;
  myDate = new Date()
  adminGuid: any;
  ProjectManagerOrHeadProgrammerArr!: ownerid[]
 AccountArr!:Acccount[]
  // ProjectTypeArr!:ProjectType[]
  constructor(private userService: UserServiceService, private router: Router,
    private datePipe: DatePipe, private popUpService: PopUpServiceService) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  isDisabled = false
  massageAddProject: any
  @Input() ProjectTypeArr!: any

  ngOnInit(): void {
    this.GetAllEmployee()
    this.GetAccount()
  }
  CreateNewProject(form: NgForm) {
    this.isDisabled = true;
    form.value.ProjectType = form.value.ProjectType.Guid
    form.value.Account=form.value.Account.Guid
    form.value.StartDate = this.datePipe.transform(form.value.StartDate, 'dd/MM/yyyy')
    form.value.EndDate = this.datePipe.transform(form.value.EndDate, 'dd/MM/yyyy')
    this.userService.AddNewProject(form.value).subscribe(res => {
      if (res) {
        this.massageAddProject = res;
        this.popUpService.setClosePopUp();
      }
    },
      err => {
        console.log(err.error);          
            swal("error!",err.error,"error");
        this.isDisabled = false;
      })
  }
  GetAllEmployee() {
    // לשים GUID אמיתי של מנהל
    this.adminGuid = ""
    this.userService.GetAllEmployee(this.adminGuid,true).subscribe(
      (res: any) => {
        this.ProjectManagerOrHeadProgrammerArr = res;
      
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  GetAccount() {
    this.userService.GetAccount().subscribe(
      (res: any) => {
        this.AccountArr = res;
      },
      (err: any) =>
        console.log(err.error)
    )
  }


}

