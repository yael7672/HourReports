import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  constructor(private datepipe: DatePipe) { }
  todayDate!: any;
  myDate = new Date();

  fromDate: any;
  untilDate: any;
  @Output() SortByDateRange = new EventEmitter<any>();
  @Input() textOfButton!: string;
  ngOnInit(): void {
    this.todayDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  sortByDateRange() {
    if (this.fromDate && this.untilDate != null && this.fromDate && this.untilDate != "") {
      let d1 = new Date(this.fromDate);
      let d2 = new Date(this.untilDate)
      if (d1.getTime() >= d2.getTime()) {
        swal('!תאריך התחלה לא יכול להיות גדול מתאריך סיום')
      }
      else {
        this.fromDate = this.datepipe.transform(this.fromDate, 'dd/MM/yyyy')
        this.untilDate = this.datepipe.transform(this.untilDate, 'dd/MM/yyyy')
        this.SortByDateRange.emit({ fromDate: this.fromDate, untilDate: this.untilDate });
        this.fromDate = "";
        this.untilDate = "";
      }
    }
    else {
      swal('!עליך להזין תאריך התחלה ותאריך סיום')
    }
  }
}