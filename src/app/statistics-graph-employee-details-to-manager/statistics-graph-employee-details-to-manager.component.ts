import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  workingHourArr!: any
  systemName: any;
  employeeDetailsWorkTimeByWorkType: any;
  employeeDetailsWorkType: any;
  employeeDetailsWorkTime: any;
  EmployeeBarWorkTimeByWorkTypeChart: any;
  employeeDetailsActualTime!: any;
  employeeDetailsWorkTime2!: any;
  showEmployeeBarChart = false;

  constructor(public activatedRoute: ActivatedRoute, public route: Router, private appService: AppService, private popUpService: PopUpServiceService, private userService: UserServiceService) { 
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);

  }

  ngOnInit(): void {
    this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetActualTimeAndWorkTime(this.systemGuid)
    this.GetWorkTimeByWorkType(this.systemGuid)
    this.systemName = localStorage.getItem('systemName');
    this.EmployeeBarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: ["שעות בפועל - שעות עבודה"],
        datasets: [{
          label: 'שעות עבודה',
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
        {
          label: 'שעות בפועל',
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
    this.EmployeeBarWorkTimeByWorkTypeChart = new Chart('BarChart2', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'שעות עבודה',
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
        {
          label: ' ',
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
  }

  GetActualTimeAndWorkTime(systemGuid: any) {
    this.userService.GetActualTimeAndWorkTime(systemGuid).then(
      res => {
        if (res) {
          this.ActualTimeAndWorkTime = res;
          this.employeeDetailsWorkTime2 = this.ActualTimeAndWorkTime.workinHourTotal
          this.employeeDetailsActualTime = this.ActualTimeAndWorkTime.actualTimeTotal
          this.Comparison()
          console.log(this.ActualTimeAndWorkTime);
        }
      }, err => {
        console.log(err.error)
      }
    )
  }
  Comparison() {
    this.EmployeeBarChart.data.datasets[0].data[0] = this.employeeDetailsWorkTime2;
    this.EmployeeBarChart.data.datasets[1].data[0] = this.employeeDetailsActualTime;
    this.EmployeeBarChart.update();
  }

  GetWorkTimeByWorkType(systemGuid: any) {
    this.userService.GetWorkTimeByWorkType(systemGuid).then(
      (res: any) => {
        this.employeeDetailsWorkTimeByWorkType = res;
        this.employeeDetailsWorkType = this.employeeDetailsWorkTimeByWorkType.map((Employee: any) => Employee.WorkType.Name)
        this.employeeDetailsWorkTime = this.employeeDetailsWorkTimeByWorkType.map((Employee: any) => Employee.workingHourTotal)
        this.ComparisonWorkTimeByWorkType()
      },
      (err: any) =>
        console.log(err.error)
    )
  }

  ComparisonWorkTimeByWorkType() {
    this.employeeDetailsWorkTime.forEach((element: any, index: any) => {
      this.EmployeeBarWorkTimeByWorkTypeChart.data.datasets[0].data[index] = this.employeeDetailsWorkTime[index];
    });
    this.employeeDetailsWorkType.forEach((element: any, index: any) => {
      this.EmployeeBarWorkTimeByWorkTypeChart.data.labels[index] = this.employeeDetailsWorkType[index];
    });
    this.EmployeeBarWorkTimeByWorkTypeChart.update();
  }


}
