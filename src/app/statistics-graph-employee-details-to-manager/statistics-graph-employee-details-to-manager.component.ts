import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import { ActualTimeAndWorkTime } from '../interfacees/ActualTimeAndWorkTime';
@Component({
  selector: 'app-statistics-graph-employee-details-to-manager',
  templateUrl: './statistics-graph-employee-details-to-manager.component.html',
  styleUrls: ['./statistics-graph-employee-details-to-manager.component.css']
})
export class StatisticsGraphEmployeeDetailsToManagerComponent implements OnInit {
  EmployeeBarChart: any
  DailyAndMonthlyWorkingHours: any;
  systemGuid: any
  ActualTimeAndWorkTime!: any
  culculte!: any[];
  workingHourArr!:any
  systemName:any;

  constructor(public route: Router, private appService: AppService, private popUpService: PopUpServiceService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    // let personalDetailsCompo = new PersonalDetailsComponent(this.route,this.appService,this.popUpService,this.userService  )
    // this.DailyAndMonthlyWorkingHours = personalDetailsCompo.GetDailyWorkingHoursAndMonthlyWorkingHours(this.systemGuid)
    this.GetActualTimeAndWorkTime(this.systemGuid)
    this.systemName = localStorage.getItem('systemName');
    this.EmployeeBarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: [this.systemName],
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
  GetActualTimeAndWorkTime(systemGuid: any) {
    this.userService.GetActualTimeAndWorkTime(systemGuid).then(
      res => {
        if (res) {
          this.ActualTimeAndWorkTime = res;
        //  =this.ActualTimeAndWorkTime.workinHourTotal
      // map((workingHour: { workHours: any; }) => workingHour.workHours)
          this.Comparison()
          console.log(this.ActualTimeAndWorkTime);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  Comparison() {
    this.EmployeeBarChart.data.datasets[0].data[0] = this.ActualTimeAndWorkTime.workinHourTotal;
    this.EmployeeBarChart.data.datasets[1].data[0] = this.ActualTimeAndWorkTime.actualTimeTotal;
    this.EmployeeBarChart.update();
  }
}
