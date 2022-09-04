import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-statistics-graph-all-employees-details-to-manager',
  templateUrl: './statistics-graph-all-employees-details-to-manager.component.html',
  styleUrls: ['./statistics-graph-all-employees-details-to-manager.component.css']
})
export class StatisticsGraphAllEmployeesDetailsToManagerComponent implements OnInit {

  AllEmployeeChart:any
  DailyAndMonthlyWorkingHours:any;
  systemGuid:any
  constructor(public route: Router, private appService: AppService, private popUpService: PopUpServiceService,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    // let personalDetailsCompo = new PersonalDetailsComponent(this.route,this.appService,this.popUpService,this.userService  )
    // this.DailyAndMonthlyWorkingHours = personalDetailsCompo.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid)
    this.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid)
  
    this.AllEmployeeChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'שעות בפועל',
          data: [0],
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
        {
          label: 'שעות עבודה',
          data: [0],
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
  GetDailyWorkingHoursAndMonthlyWorkingHours(systemGuid:any) {
    this.userService.GetDailyWorkingHoursAndMonthlyWorkingHours(systemGuid).subscribe(
      res => {
        if (res) {
          this.DailyAndMonthlyWorkingHours = res;
        //  alert( this.DailyAndMonthlyWorkingHours.MonthlyWorkingHours);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  // ComparisonDailyWorkingHoursAndMonthlyWorkingHours() {
  //   this.LineChart.data.datasets[0].data =  2;  
      // this.LineChart.data.datasets[1].data =  this.DailyAndMonthlyWorkingHours.DailyWorkingHours
  // }
}
