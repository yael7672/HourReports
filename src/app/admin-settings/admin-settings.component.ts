import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import  swal from 'sweetalert';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  @Input() header:any;
  @Input() employeeDetails:any;
  UpdateEmployeeRes:any
  disableAfterUpdate=false
  EmployeeDetailsToUpdate:any

  constructor(private userService:UserServiceService,private appService:AppService,private popUpService:PopUpServiceService) { }

  ngOnInit(): void {
  }

  UpdateEmployeeDetails(form:NgForm){ 
    this.disableAfterUpdate=true
    this.EmployeeDetailsToUpdate = {
    EmployeeGuid:this.employeeDetails.EmployeeGuid,
    EmployeeName:this.employeeDetails.EmployeeName,
    EmployeeJob:this.employeeDetails.EmployeeJob,
    EmployeeJobPercentage:this.employeeDetails.EmployeeJobPercentage=="" ? 0:this.employeeDetails.EmployeeJobPercentage,
    TotalMonthlyWorkingHours:this.employeeDetails.TotalMonthlyWorkingHours =="" ? 0:this.employeeDetails.TotalMonthlyWorkingHours,
    MonthlyTargetByJobScope:this.employeeDetails.MonthlyTargetByJobScope =="" ? 0:this.employeeDetails.MonthlyTargetByJobScope
    }
      this.userService.UpdateEmployeeDetails(this.EmployeeDetailsToUpdate).subscribe(
        (res: any) => {
          this.UpdateEmployeeRes = res;
          swal(this.UpdateEmployeeRes)
          this.appService.setIsPopUpOpen(false);
          this.popUpService.setSpecificPopUp(false,"EditEmployeeDetailsByAdmin") 
          this.disableAfterUpdate=true
        },
        (err: any) =>
        {
          console.log(err.error)
          this.disableAfterUpdate=true
          this.appService.setIsPopUpOpen(false);
          this.popUpService.setSpecificPopUp(false,"EditEmployeeDetailsByAdmin")
        } 
      )
    }
  
}
