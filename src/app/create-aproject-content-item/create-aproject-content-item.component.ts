import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-create-aproject-content-item',
  templateUrl: './create-aproject-content-item.component.html',
  styleUrls: ['./create-aproject-content-item.component.css']
})
export class CreateAprojectContentItemComponent implements OnInit {

  todayDate!:any;
  myDate=new Date()
  constructor(private datePipe: DatePipe ,private userServiceService:UserServiceService ) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   console.log(this.todayDate);
}
  ngOnInit(): void {
  }
  CreateNewProjectItem(form:NgForm){
    this.userServiceService.CreateNewProjectItem(form.value).subscribe(
      (res: any) => {
        // this.user = res;
        // console.log(this.user);
        // alert(this.user+"ברוך הבא")
      },
      (err: any) =>
        alert("error")
    )
  }

}
