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
  myChart:any
  constructor() { }

  ngOnInit(): void {
    // this.ComparisonHoursAllocatedTaskToActualHours()
  
    //  this.myChart = new Chart("myChart", {
  //     type: 'doughnut',
  //     data: {
  //       //  labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [this.dataProp.WorkingHours],
  //         backgroundColor: [
  //           'rgba(215, 99, 132, 6)',
  //           'rgba(225, 99, 144, 5)',
  //           'rgba(235, 95, 165, 0.4)',
  //           'rgba(245, 96, 111, 0.1)',
  //         ],
  //         borderColor: [
  //           'rgba(75, 192, 192, 1)',
  //         ],
  //         borderWidth: 1
  //       },
  //       {
  //         label: '# of Votes',
  //         data: [this.dataProp.TotalActualTime],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',

  //         ],
  //         borderColor: [
  //           'rgba(255, 159, 64, 1)',
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //     },
  //     // options: {
  //     //     scales: {
  //     //         y: {
  //     //             beginAtZero: true
  //     //         }
  //     //     }
  //     // }
  //   });


    this.myChart = new Chart("myChart", {
 
        type: 'line',
      data: {
        //  labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'],

          datasets: [
            {
              label: 'Dataset 1',
              data:[2,3,4] ,
              borderColor:"blue" ,
              backgroundColor: "red",
              stack: 'combined',
              type: 'bar'
            },
            {
              label: 'Dataset 2',
              data: [1,2],
              borderColor:[
                'rgba(295, 39, 152, 0.2)',        
            ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',        
            ],
              stack: 'combined',
           
            }
          ]
       
      },
  
        options: {
          // plugins: {
          //   title: {
          //     display: true,
          //     text: 'Chart.js Stacked Line/Bar Chart'
          //   }
          // },
          // scales: {
          //   y: {
          //     stacked: true
          //   }
          // }
        },
      }
      // options: {
      //     scales: {
      //         y: {
      //             beginAtZero: true
      //         }
      //     }
      // }
    );
  }

  ComparisonHoursAllocatedTaskToActualHours() {
    this.dataPropActualTime =this.dataProp.TotalActualTime 
    this.myChart.data.datasets[0].data=this.dataProp.TotalActualTime
    this.myChart.data.datasets[1].data=this.dataProp.workingHour
  }

}


