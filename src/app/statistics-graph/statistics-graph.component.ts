import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { UserServiceService } from '../user-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics-graph',
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit {
  LineChartText!: string;
  systemGuid!: any;
  LineChart1: any;
  //workingHourArrForLineChart!:any
  //actualHoursArrForLineChart!:any[]
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
  x!: any;
  constructor(private userService: UserServiceService, public datepipe: DatePipe) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }
  ngOnInit(): void {
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
          borderColor:'#ffb000',

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
            '#f1b93cd4',

          ],
          borderColor: [
            '#f1b93cd4',

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

  GetMyProjectContentItemByTimeLineChart(val=null) {
    this.LineChart1.render();
    this.systemGuid = localStorage.getItem('systemGuid');
    this.dateOfSearchBeforeForLineChart = this.datepipe.transform(this.dateOfSearchBeforeForLineChart, 'dd/MM/yyyy')
    this.dateOfSearchAfterForLineChart = this.datepipe.transform(this.dateOfSearchAfterForLineChart, 'dd/MM/yyyy')
    this.userService.GetMyProjectContentItemByTime(this.systemGuid, this.dateOfSearchBeforeForLineChart, this.dateOfSearchAfterForLineChart,val).subscribe(res => {
      if (res) {
        this.WorkingHoursAndActualHoursForLineChart = res;
        console.log(this.WorkingHoursAndActualHoursForLineChart);
        this.workingHourArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((workingHour: { workHours: any; }) => workingHour.workHours)
        console.log(this.workingHourArrForLineChart);
        this.actualHoursArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((actualHours: { actualHours: any; }) => actualHours.actualHours)
        console.log(this.actualHoursArrForLineChart);
        this.dateArrForLineChart = this.WorkingHoursAndActualHoursForLineChart.map((Date: { Date: any; }) => this.datepipe.transform(Date.Date, 'dd/MM/yyyy'))
        console.log("dateArr", this.dateArrForLineChart);
      }
    },
      err => {
        console.log(err.error);
      })
    if (this.workingHourArrForLineChart != null) {
      this.LineChart1.data.datasets[0].data = this.workingHourArrForLineChart;
      this.LineChart1.data.datasets[1].data = this.actualHoursArrForLineChart;
      this.LineChart1.data.labels = this.dateArrForLineChart;
      this.LineChart1.update();
    }

  }
  GetMyProjectContentItemByTimeBarChart(val=null) {
    this.LineChart1.render();
    this.systemGuid = localStorage.getItem('systemGuid');
    this.dateOfSearchBeforeForBarChart = this.datepipe.transform(this.dateOfSearchBeforeForBarChart, 'dd/MM/yyyy')
    this.dateOfSearchAfterForBarChart = this.datepipe.transform(this.dateOfSearchAfterForBarChart, 'dd/MM/yyyy')
    this.userService.GetMyProjectContentItemByTime(this.systemGuid, this.dateOfSearchAfterForBarChart, this.dateOfSearchBeforeForBarChart,val).subscribe(res => {
      if (res) {
        this.WorkingHoursAndActualHoursForBarChart = res;
        console.log(this.WorkingHoursAndActualHoursForBarChart);
        this.workingHourArrForBarChart = this.WorkingHoursAndActualHoursForBarChart.map((workingHour: { workHours: any; }) => workingHour.workHours)
        console.log(this.workingHourArrForBarChart);
        this.actualHoursArrForBarChart = this.WorkingHoursAndActualHoursForBarChart.map((actualHours: { actualHours: any; }) => actualHours.actualHours)
        console.log(this.actualHoursArrForBarChart);
        this.dateArrForBarChart = this.WorkingHoursAndActualHoursForBarChart.map((Date: { Date: any; }) => this.datepipe.transform(Date.Date, 'dd/MM/yyyy'))
        console.log("dateArr", this.dateArrForBarChart);

        this.culculte = this.WorkingHoursAndActualHoursForBarChart.map(i => (i.workHours * 100)
          / i.actualHours)
        console.log(this.culculte);
      }
    },
      err => {
        console.log(err.error);
      })

    this.BarChart.data.datasets[0].data =this.culculte;
      this.BarChart.data.labels = this.dateArrForBarChart;

    this.BarChart.update();

  }
}