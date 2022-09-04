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

  AllEmployeeChartEmployeeDetailsMonthlyWorkingHours: any
  DailyAndMonthlyWorkingHours: any;
  systemGuid: any
  employeeDetails: any;
  employeeDetailsMonthlyWorkingHours: any
  employeeDetailsName: any
  dateChart: any
  AllEmployeeOpenTasksChart: any
  employeeDetailsOpenTask: any
  openChartMonthlyWorkingHours = true;
  openChartOpenTask = false;
  constructor(public route: Router, private appService: AppService, private popUpService: PopUpServiceService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'שעות עבודה חודשיות',
          data: [],
          backgroundColor: [
            'blue',
            
          ],
          borderColor: [
            'blue',
           
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
    this.AllEmployeeOpenTasksChart = new Chart('BarChart2', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'משימות פתוחות',
          data: [],
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
    this.GetEmployeeDetails(this.systemGuid)
  }

  GetEmployeeDetails(systemGuid: any) {
    this.userService.GetEmployeeDetails(systemGuid).subscribe(
      (res: any) => {
        this.employeeDetails = res;
        this.employeeDetailsMonthlyWorkingHours = this.employeeDetails.map((Employee: any) => Employee.EmployeeMonthlyWorkingHours)
        this.employeeDetailsName = this.employeeDetails.map((Employee: any) => Employee.EmployeeName)
        this.employeeDetailsOpenTask = this.employeeDetails.map((Employee: any) => Employee.EmployeeOpenTasks)
        this.ComparisonEmployeeDetailsOpenTasks()
        this.ComparisonEmployeeDetailsMonthlyWorkingHours()

      },
      (err: any) =>
        console.log(err.error)
    )
  }
  ComparisonEmployeeDetailsMonthlyWorkingHours() {
    this.employeeDetailsMonthlyWorkingHours.forEach((element: any, index: any) => {
      this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data[index] = this.employeeDetailsMonthlyWorkingHours[index];
    });
    this.employeeDetailsName.forEach((element: any, index: any) => {
      this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.labels[index] = this.employeeDetailsName[index];
    });
    this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.update();
  }

  ComparisonEmployeeDetailsOpenTasks() {
    this.employeeDetailsOpenTask.forEach((element: any, index: any) => {
      this.AllEmployeeOpenTasksChart.data.datasets[0].data[index] = this.employeeDetailsOpenTask[index];
    });
    this.employeeDetailsName.forEach((element: any, index: any) => {
      this.AllEmployeeOpenTasksChart.data.labels[index] = this.employeeDetailsName[index];
    });
    this.AllEmployeeOpenTasksChart.update();
  }
  GetMyChart(val: any) {
    if (val == 2) {
      this.GetEmployeeDetails(this.systemGuid)
      // this.openChartMonthlyWorkingHours = false
      this.openChartOpenTask = true

    }
    else {
      if (val == 1) {
        this.GetEmployeeDetails(this.systemGuid)
        // this.openChartOpenTask = false
        this.openChartMonthlyWorkingHours = true

      }
    }
  }
}
