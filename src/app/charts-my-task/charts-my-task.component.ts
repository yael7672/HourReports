import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-charts-my-task',
  templateUrl: './charts-my-task.component.html',
  styleUrls: ['./charts-my-task.component.css']
})
export class ChartsMyTaskComponent implements OnInit {
  @Input() dataProp: any
  dataPropActualTime!: any
  myChart: any
  constructor() { }

  ngOnInit(): void {
    //this.ComparisonHoursAllocatedTaskToActualHours()
    const myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: ["שעות מוקצות למשימה", "שעות בפועל"],
        datasets: [
          {
            label: "שעות מוקצות למשימה",
            backgroundColor: ["#8e0ea2", "#f8f7f3"],
            borderColor: ["#3e95cd"],
            data: [this.dataProp.TotalActualTime, 0]
          }
          , {
            label: "שעות בפועל",
            backgroundColor: ["#3e05cd", "#3e95cd", "#f8f7f3"],
            borderColor: ["#3e95cd"],
            data: [this.dataProp.WorkingHours, 0]
          }
          , {
            label: "",
            backgroundColor: ["#f8f7f3"],
            borderColor: ["#3e95cd"],
            data: [0]
          }
        ]
      },

      // options: {
      //     scales: {
      //         y: {
      //             beginAtZero: true
      //         }
      //     }
      // }
    });
    //  this.myChart = new Chart("myChart", {
    //   type: 'line',
    //   data: {
    //     //  labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [2,2,2],
    //       // data: [this.dataProp.WorkingHours],
    //       backgroundColor: [
    //         'rgba(215, 99, 132, 6)',
    //         'rgba(225, 99, 144, 5)',
    //         'rgba(235, 95, 165, 0.4)',
    //         'rgba(245, 96, 111, 0.1)',
    //       ],
    //       borderColor: [
    //         'rgba(75, 192, 192, 1)',
    //       ],
    //       borderWidth: 1
    //     },
    //     {
    //       label: '# of Votes',
    //       data: [1,1,3],
    //       // data: [this.dataProp.TotalActualTime],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(255, 99, 132, 0.2)',

    //       ],
    //       borderColor: [
    //         'rgba(255, 159, 64, 1)',
    //         'rgba(255, 99, 132, 0.2)',
    //       ],
    //       borderWidth: 1
    //     }
    //   ]
    //   },
    //   // options: {
    //   //     scales: {
    //   //         y: {
    //   //             beginAtZero: true
    //   //         }
    //   //     }
    //   // }
    // });


  }

  ComparisonHoursAllocatedTaskToActualHours() {
    this.dataPropActualTime = this.dataProp.TotalActualTime
    this.myChart.data.datasets[0].data = this.dataProp.TotalActualTime
    this.myChart.data.datasets[1].data = this.dataProp.WorkingHours
  }

}


