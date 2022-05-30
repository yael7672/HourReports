import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-aproject-content-item',
  templateUrl: './create-aproject-content-item.component.html',
  styleUrls: ['./create-aproject-content-item.component.css']
})
export class CreateAprojectContentItemComponent implements OnInit {

  todayDate!:any;
  myDate=new Date()
  constructor(private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   console.log(this.todayDate);
}
  ngOnInit(): void {
  }

}
