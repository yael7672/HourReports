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
  dateOfSearchBeforeForLineChart !: any;
  dateOfSearchAfterForLineChart!: any;
  dateOfSearchBeforeForBarChart !: any;
  dateOfSearchAfterForBarChart!: any;
  BarChart: any;
  culculte!: any[];
  culculteCopy !: any[];
  colorArr!: any[];
  x!: any;
  AverageBreaksByTimeLineChart!: averageBreaks;
  AverageBreaksByTimeBarChart!: averageBreaks;
  AverageBreaks: any;
  selectedItem: any;
  todayDate!: any;
  myDate = new Date();
  todayDateCopy = new Date();
  showThisWeek!: any;
  dateAndCulculte: any;
  dateAndCulculteArr:any;
  constructor(private userService: UserServiceService, public datepipe: DatePipe) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }
  ngOnInit(): void {
    this.showThisWeek = "2";
    this.GetMyProjectContentItemByTimeLineChart(this.showThisWeek)
    this.todayDate = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
    this.LineChart1 = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [
          "יום חמישי", "יום רבעי", "יום שלישי", "יום שני", "יום ראשון"
        ],
        datasets: [{
          label: 'שעות עבודה',
          data: 0,
          borderWidth: 1,
          fill: false,
          borderColor: '#ffb000',
        },
        {
          label: 'שעות בפועל',
          data: 0,
          borderWidth: 1,
          fill: false,
          borderColor: 'black'
        },
        ]
      },
      options: {
        scales: {
          // yAxes: [{
          //   ticks: {
          //     beginAtZero: true
          //   }
          // }]
        }
      }
    });
    this.BarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
      this.SortByDateRange(val);
      return
    }
    if (showThisWeek != null) {
      val = showThisWeek;
    }
    //this.LineChart1.render();
    this.systemGuid = localStorage.getItem('systemGuid');
    this.dateOfSearchBeforeForLineChart = this.datepipe.transform(this.dateOfSearchBeforeForLineChart, 'dd/MM/yyyy')
    this.dateOfSearchAfterForLineChart = this.datepipe.transform(this.dateOfSearchAfterForLineChart, 'dd/MM/yyyy')
    if (!this.dateOfSearchBeforeForLineChart) {
      this.dateOfSearchBeforeForLineChart = "";
    }
    if (!this.dateOfSearchAfterForLineChart) {
      this.dateOfSearchAfterForLineChart = "";
    }
    this.userService.GetMyProjectContentItemByTime(this.systemGuid, this.dateOfSearchBeforeForLineChart, this.dateOfSearchAfterForLineChart, Number(val)).then(res => {
      if (res) {
        this.WorkingHoursAndActualHoursForLineChart = res;
        console.log(this.WorkingHoursAndActualHoursForLineChart);
        this.workingHourArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((workingHour: { workHours: any; }) => workingHour.workHours)
        console.log(this.workingHourArrForLineChart);
        this.actualHoursArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((actualHours: { actualHours: any; }) => actualHours.actualHours)
        console.log(this.actualHoursArrForLineChart);
        this.dateArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((Date: { Date: any; }) => this.datepipe.transform(Date.Date, 'dd/MM/yyyy'))
        console.log("dateArr", this.dateArrForLineChart);
        this.updateLineChart();
        this.dateOfSearchBeforeForLineChart = "";
        this.dateOfSearchAfterForLineChart = "";
        this.showInputsDates = false;
        this.culculte = this.WorkingHoursAndActualHoursForLineChart.map((i: { workHours: number; actualHours: number; }) => (i.workHours * 100)
          / i.actualHours)
        console.log(this.culculte);
        this.CreateObjectWithDateAndCulculte(this.dateArrForLineChart, this.culculte)
        this.updateBarChart();
      }
    },
      err => {
        console.log(err.error);
      })
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
  GetAverageBreaksByTimeLineChart(systemGuid: any, dateOfSearchBeforeForLineChart: any, dateOfSearchAfterForLineChart: any) {
    this.userService.GetAverageBreaks(systemGuid, dateOfSearchBeforeForLineChart, dateOfSearchAfterForLineChart).subscribe(
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

  GetAverageBreaksByTimeBarChart(systemGuid: any, dateOfSearchBeforeForBarChart: any, dateOfSearchAfterForBarChart: any) {
    this.userService.GetAverageBreaks(systemGuid, dateOfSearchBeforeForBarChart, dateOfSearchAfterForBarChart).subscribe(
      res => {
        if (res) {
          this.AverageBreaksByTimeBarChart = res

          // swal(res + "GetAverageBreaksByTimeBarChart")
        }
      },
      err => {
        console.log(err.error);
      })
  }
  SortByDateRange(val = null) {
    this.showInputsDates = true;
    if (val == null) //זה אומר שלחץ על כפתור ההשואה
    {
      this.GetMyProjectContentItemByTimeLineChart();
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
        if (i > 51 && i < 101) {
          this.colorArr[a] = "rgba(6, 186, 6, 0.932)";
        }
        else
          if (i > 101 && i < 150) {
            this.colorArr[a] = "rgb(10, 179, 10)";
          }
          else
            if (i > 151 && i < 201) {
              this.colorArr[a] = "rgb(6, 142, 6)";
            }
      a++;
    }); console.log(this.colorArr);
  }
}
