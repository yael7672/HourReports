import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import { ActualTimeAndWorkTime } from '../interfacees/ActualTimeAndWorkTime';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-statistics-graph-employee-details-to-manager',
  templateUrl: './statistics-graph-employee-details-to-manager.component.html',
  styleUrls: ['./statistics-graph-employee-details-to-manager.component.css']
})
export class StatisticsGraphEmployeeDetailsToManagerComponent implements OnInit {
  EmployeeBarChart: any
  DailyAndMonthlyWorkingHours: any;
  EmployeeGuid: any
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
  dateOfSearchBeforeFor2BarChart: any;
  dateOfSearchAfterFor2BarChart: any;
  todayDate!: any;
  myDate = new Date()
  showCompareDatesEmployeeDetails = false
  EmployeeName:any
  constructor(public datePipe: DatePipe, public activatedRoute: ActivatedRoute, public route: Router, private appService: AppService, private popUpService: PopUpServiceService, private userService: UserServiceService) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    this.EmployeeGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetActualTimeAndWorkTime(this.EmployeeGuid, 4, "", "")
    this.GetWorkTimeByWorkType(this.EmployeeGuid, 4, "", "")
    this.EmployeeName = localStorage.getItem('EmployeeName');

    this.EmployeeBarChart = new Chart('BarChart', {
      type: 'bar',
      data: {
        labels: ["שעות בפועל - שעות עבודה"],
        datasets: [{
          label: 'שעות עבודה',
          data: [],
          backgroundColor: [
            'Green',
          ],
          borderColor: [
            'Green',
          ],
          borderWidth: 1
        },
        {
          label: 'שעות בפועל',
          data: [],
          backgroundColor: [
            'Blue',
           
          ],
          borderColor: [
            'Blue',
            
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
  
          ],
          borderColor: [
            'green',
       
          ],
          borderWidth: 1
        },
        // {
          // label: ' ',
          // data: [],
          // backgroundColor: [
          
          // ],
          // borderColor: [
       
          // ],
          // borderWidth: 1
        // },
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

  GetActualTimeAndWorkTime(EmployeeGuid: any, selectedTime: any, FromDate: any, UntilDate: any) {
    this.userService.GetActualTimeAndWorkTime(EmployeeGuid, selectedTime, FromDate, UntilDate).then(
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

  GetWorkTimeByWorkType(EmployeeGuid: any, selectedTime: any, FromDate: any, UntilDate: any) {
    this.userService.GetWorkTimeByWorkType(EmployeeGuid, selectedTime, FromDate, UntilDate).then(
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
    if (this.employeeDetailsWorkTime == 0) {
      this.EmployeeBarWorkTimeByWorkTypeChart.data.datasets[0].data[0] = 0;
      this.EmployeeBarWorkTimeByWorkTypeChart.data.datasets[1].data[0] = 0;
      this.EmployeeBarChart.update();
    }
    else {
      this.employeeDetailsWorkTime.forEach((element: any, index: any) => {
        this.EmployeeBarWorkTimeByWorkTypeChart.data.datasets[0].data[index] = this.employeeDetailsWorkTime[index];
      });
      this.employeeDetailsWorkType.forEach((element: any, index: any) => {
        this.EmployeeBarWorkTimeByWorkTypeChart.data.labels[index] = this.employeeDetailsWorkType[index];
      });
      this.EmployeeBarWorkTimeByWorkTypeChart.update();
    }
  }

  GetWorkTimeByWorkTypeAndWorkTimeCompareActualTimeChart(val: any) {
    if (val == 1) {
      this.showCompareDatesEmployeeDetails = true
    }
    else {
      this.GetActualTimeAndWorkTime(this.EmployeeGuid, val, "", "")
      this.GetWorkTimeByWorkType(this.EmployeeGuid, val, "", "")
    }
  }

  SortWorkTimeByWorkTypeAndWorkTimeCompareActualTimeByDateRange(FromDate: any, UntilDate: any) {
    UntilDate = this.datePipe.transform(UntilDate, 'dd/MM/yyyy')
    FromDate = this.datePipe.transform(FromDate, 'dd/MM/yyyy')
    if (UntilDate == undefined || null) {
      UntilDate = this.todayDate
      UntilDate = this.datePipe.transform(UntilDate, 'dd/MM/yyyy')
    }
    if (FromDate == undefined || null) {
      FromDate = this.todayDate
      FromDate = this.datePipe.transform(FromDate, 'dd/MM/yyyy')
    }
    this.GetActualTimeAndWorkTime(this.EmployeeGuid, 1, UntilDate, FromDate)
    this.GetWorkTimeByWorkType(this.EmployeeGuid, 1, UntilDate, FromDate)
  }
}
