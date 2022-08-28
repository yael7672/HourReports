import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-an-existing-task',
  templateUrl: './update-an-existing-task.component.html',
  styleUrls: ['./update-an-existing-task.component.css']
})
export class UpdateAnExistingTaskComponent implements OnInit {

  todayDate!: any;
  myDate = new Date()
  constructor(private datePipe: DatePipe) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
  }

}
