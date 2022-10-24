import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { UserServiceService } from '../user-service.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';
import { averageBreaks } from '../interfacees/averageBreaks';

@Component({
  selector: 'app-statistics-graph',
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit {
  LineChartText = "בתאריך"
  src = ""
  systemGuid!: any;
  LineChart1: any;
  showInputsDates = false;
  WorkingHoursAndActualHoursForLineChart!: any;
  workingHourArrForLineChart!: any
  actualHoursArrForLineChart!: any[]
  WorkingHoursAndActualHoursForBarChart!: any[];
  workingHourArrForBarChart!: any
  actualHoursArrForBarChart!: any[]
  dateArrForLineChart!: any[]
  dateArrForBarChart!: any[]
  fromDate !: any;
  untilDate!: any;
  BarChart: any;
  culculte!: any[];
  culculteCopy !: any[];
  colorArr!: any[];
  x!: any;
  AverageBreaksByTimeLineChart!: any;
  AverageBreaksByTimeBarChart!: averageBreaks;
  AverageBreaks: any;
  selectedItem: any;
  todayDate!: any;
  myDate = new Date();
  todayDateCopy = new Date();
  showThisWeek!: any;
  dateAndCulculte: any;
  dateAndCulculteArr: any;
  constructor(private userService: UserServiceService, public datepipe: DatePipe) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }
  ngOnInit(): void {
    this.showThisWeek = "2";
    this.systemGuid = localStorage.getItem('systemGuid');
    this.GetAverageBreaksByTimeLineChart(this.systemGuid, "", "", this.showThisWeek)
    this.GetMyProjectContentItemByTimeLineChart(this.showThisWeek)

    this.todayDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
    this.untilDate=this.todayDate
    this.fromDate= this.todayDate
    this.LineChart1 = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [
          "יום חמישי", "יום רביעי", "יום שלישי", "יום שני", "יום ראשון"
        ],
        datasets: [{
          label: 'שעות עבודה',
          data: 0,
          borderWidth: 1,
          fill: false,
          borderColor: 'red',
        },
        {
          label: 'שעות בפועל',
          data: 0,
          borderWidth: 1,
          fill: false,
          borderColor: 'green'
        },
        ]
      },
      options: {
        scales: {
        }
      }
    });
    this.BarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'רמת פרודקטביות ',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'green',
            'red',
          ],
          borderColor: [
            'green',
            'red',
          ],
          borderWidth: 1
        },


        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });
  }

  GetMyProjectContentItemByTimeLineChart(val = null, showThisWeek = null) {
    if (val == 0) {
      this.showInputsDates = true;
      return
    }
    if (showThisWeek != null) {
      val = showThisWeek;
    }
    this.showInputsDates = val == 0 || val == null ? true : false;
    this.systemGuid = localStorage.getItem('systemGuid');
    this.fromDate = this.datepipe.transform(this.fromDate, 'dd/MM/yyyy')
    this.untilDate = this.datepipe.transform(this.untilDate, 'dd/MM/yyyy')
    if (!this.fromDate) {
      this.fromDate = "";
    }
    if (!this.untilDate) {
      this.untilDate = "";
    }
    this.userService.GetMyProjectContentItemByTime(this.systemGuid, this.fromDate, this.untilDate, Number(val)).then(res => {
      if (res) {
        this.WorkingHoursAndActualHoursForLineChart = res;
        this.workingHourArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((workingHour: { workHours: any; }) => workingHour.workHours)
        this.actualHoursArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((actualHours: { actualHours: any; }) => actualHours.actualHours)
        this.dateArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((Date: { Date: any; }) => this.datepipe.transform(Date.Date, 'dd/MM/yyyy'))
        this.updateLineChart();
        this.fromDate = "";
        this.untilDate = "";
        this.culculte = this.WorkingHoursAndActualHoursForLineChart.map((i: { workHours: number; actualHours: number; }) => (i.workHours * 100)
          / i.actualHours)
        this.CreateObjectWithDateAndCulculte(this.dateArrForLineChart, this.culculte)
        this.updateBarChart();
      }
    },
      err => {
        console.log(err.error);
      })
    this.GetAverageBreaksByTimeLineChart(this.systemGuid, this.fromDate, this.untilDate, Number(val))


  }
  CreateObjectWithDateAndCulculte(dateArrForLineChart: any, culculte: any) {
    this.dateAndCulculte = {}
    dateArrForLineChart.forEach((element: any, index: any) => {
      this.dateAndCulculte[index] = { "date": dateArrForLineChart[index], "culculte": culculte[index] };
    });
  }
  updateLineChart() {
    this.LineChart1.data.datasets[0].data = this.workingHourArrForLineChart;
    this.LineChart1.data.datasets[1].data = this.actualHoursArrForLineChart;
    this.LineChart1.data.labels = this.dateArrForLineChart;
    this.LineChart1.update();
  }

  updateBarChart() {
    this.BarChart.data.datasets[0].data = this.culculte;
    this.CreatColorArr();
    this.BarChart.data.labels = this.dateArrForLineChart;
    this.BarChart.data.datasets[0].backgroundColor = this.colorArr;
    this.BarChart.data.datasets[0].borderColor = this.colorArr;

    this.BarChart.update();
  }
  GetAverageBreaksByTimeLineChart(systemGuid: any, fromDate: any, untilDate: any, selectedDay: any) {
    this.userService.GetAverageBreaks(systemGuid, fromDate, untilDate, selectedDay).then(
      res => {
        if (res) {
          this.AverageBreaksByTimeLineChart = res
          this.AverageBreaks = (this.AverageBreaksByTimeLineChart.TotalBreakHours) / (this.AverageBreaksByTimeLineChart.DiffrenceDay)
          // swal(res + "GetAverageBreaksByTimeLineChart")
        }
      },
      err => {
        console.log(err.error);
      })
  }

  // GetAverageBreaksByTimeBarChart(systemGuid: any, fromDate: any, untilDate: any) {
  //   this.userService.GetAverageBreaks(systemGuid, fromDate, untilDate,"3").subscribe(
  //     res => {
  //       if (res) {
  //         this.AverageBreaksByTimeBarChart = res
  //       }
  //     },
  //     err => {
  //       console.log(err.error);
  //     })
  // }
  SortByDateRange() {
    if (this.fromDate && this.untilDate != null && this.fromDate && this.untilDate != "") {
      let d1 = new Date(this.fromDate);
      let d2 = new Date(this.untilDate)
      if (d1.getTime() <= d2.getTime()) {
        this.GetMyProjectContentItemByTimeLineChart();
        this.GetAverageBreaksByTimeLineChart(this.systemGuid, this.fromDate, this.untilDate, "")
      }
      else {
        swal('!תאריך התחלה לא יכול להיות גדול מתאריך סיום')
      }
    }
    else {
      swal('עליך להזין תאריך התחלה ותאריך סיום')
    }
  }

  CreatColorArr() {
    this.culculteCopy = [...this.culculte]
    this.colorArr = [];
    let a = 0;
    this.culculteCopy.forEach(i => {
      if (i < 51) {
        this.colorArr[a] = "rgba(255, 0, 0, 0.947)";
      } else
        if (i > 51 && i < 80) {
          this.colorArr[a] = "rgb(240, 63, 63)";
        }
        else
          if (i > 81 && i < 110) {
            this.colorArr[a] = "blue";
          }
          else
            if (i > 111 && i < 150) {
              this.colorArr[a] = "rgb(6, 142, 6)";
            }
            else
              if (i > 151) {
                this.colorArr[a] = "rgb(10, 179, 10)";
              }
      a++;
    })
  }
}
