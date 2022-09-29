import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert';

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
  employeeDetailsName: any
  dateChart: any
  AllEmployeeOpenTasksChart: any
  employeeDetailsOpenTask: any
  openChartMonthlyWorkingHours = true;
  openChartOpenTask = false;
  showCompareDatesAllEmployeeDetails = false;
  fromDate: any;
  untilDate: any;
  todayDate!: any;
  myDate = new Date()
  employeeDetailsMonthlyWorkingHours: any
  employeeDetailsWeeklyWorkingHours: any;
  employeeDetailsDailyWorkingHours: any;
  employeeDetailsfromDateUntilHours: any;
  colorArrTaskOpen!: any[];
  colorArr2TaskOpen!: any[];
  colorArrTaskOpenCopy !: any[];
  constructor(public route: Router, private appService: AppService,
    private popUpService: PopUpServiceService, private userService: UserServiceService
    , private datePipe: DatePipe) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

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
    this.GetEmployeeDetails(this.systemGuid, "", "", 4)
  }

  GetEmployeeDetails(systemGuid: any, fromDate: any, untilDate: any, val: any) {
    this.userService.GetEmployeeDetails(systemGuid, fromDate, untilDate).subscribe(
      (res: any) => {
        this.employeeDetails = res;
        this.employeeDetailsMonthlyWorkingHours = this.employeeDetails.map((Employee: any) => Employee.EmployeeMonthlyWorkingHours)
        this.employeeDetailsDailyWorkingHours = this.employeeDetails.map((Employee: any) => Employee.EmployeeDailyWorkingHours)
        this.employeeDetailsWeeklyWorkingHours = this.employeeDetails.map((Employee: any) => Employee.EmployeeWeeklyWorkingHours)
        this.employeeDetailsfromDateUntilHours = this.employeeDetails.map((Employee: any) => Employee.EmployeefromDateUntilHours)
        this.employeeDetailsName = this.employeeDetails.map((Employee: any) => Employee.EmployeeName)
        this.employeeDetailsOpenTask = this.employeeDetails.map((Employee: any) => Employee.EmployeeOpenTasks)
        this.ComparisonEmployeeDetailsOpenTasks()
        this.ComparisonEmployeeDetailsMonthlyWorkingHours(val)
        this.fromDate = "";
        this.untilDate = "";
      },
      (err: any) =>
        console.log(err.error)
    )
  }
  // 1=תאריכים
  // 2=היום
  // 3=השבוע
  // 4=החודש

  ComparisonEmployeeDetailsMonthlyWorkingHours(val: any) {
    this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data = []
    this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.labels = []
    if (val == 1) {
      this.employeeDetailsfromDateUntilHours.forEach((element: any, index: any) => {
        this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data[index] = this.employeeDetailsfromDateUntilHours[index];
      });
    }
    if (val == 2) {
      this.employeeDetailsDailyWorkingHours.forEach((element: any, index: any) => {
        this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data[index] = this.employeeDetailsDailyWorkingHours[index];
      });
    }
    if (val == 3) {
      this.employeeDetailsWeeklyWorkingHours.forEach((element: any, index: any) => {
        this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data[index] = this.employeeDetailsWeeklyWorkingHours[index];
      });
    }
    if (val == 4) {
      this.employeeDetailsMonthlyWorkingHours.forEach((element: any, index: any) => {
        this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.datasets[0].data[index] = this.employeeDetailsMonthlyWorkingHours[index];
      });
    }
    this.employeeDetailsName.forEach((element: any, index: any) => {
      this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.data.labels[index] = this.employeeDetailsName[index];
    });
    this.AllEmployeeChartEmployeeDetailsMonthlyWorkingHours.update();
  }

  ComparisonEmployeeDetailsOpenTasks() {
    this.AllEmployeeOpenTasksChart.data.datasets[0].data = []
    this.AllEmployeeOpenTasksChart.data.labels = []
    this.employeeDetailsOpenTask.forEach((element: any, index: any) => {
      this.AllEmployeeOpenTasksChart.data.datasets[0].data[index] = this.employeeDetailsOpenTask[index];
    });
    this.employeeDetailsName.forEach((element: any, index: any) => {
      this.AllEmployeeOpenTasksChart.data.labels[index] = this.employeeDetailsName[index];
    });
    this.CreatColorArr()
    this.AllEmployeeOpenTasksChart.data.datasets[0].backgroundColor = this.colorArrTaskOpen;
    this.AllEmployeeOpenTasksChart.data.datasets[0].borderColor = this.colorArrTaskOpen;
    this.AllEmployeeOpenTasksChart.update();
  }

  GetWorkTimeChartByWorkTime(val: any) {
    if (val == 1) {
      this.showCompareDatesAllEmployeeDetails = true
    }
    else {
      if (val == 2) {
        this.GetEmployeeDetails(this.systemGuid, "", "", 2)
        this.showCompareDatesAllEmployeeDetails = false
      }
      else {
        if (val == 3) {
          this.GetEmployeeDetails(this.systemGuid, "", "", 3)
          this.showCompareDatesAllEmployeeDetails = false
        }
        else {
          if (val == 4) {
            this.GetEmployeeDetails(this.systemGuid, "", "", 4)
            this.showCompareDatesAllEmployeeDetails = false
          }
        }
      }
    }
  }
  SortWorkTimeByDateRange() {
    if (this.fromDate && this.untilDate != null && this.fromDate && this.untilDate != "") {
      let d1 = new Date(this.fromDate);
      let d2 = new Date(this.untilDate)
      if (d1.getTime() <= d2.getTime()) {
        this.untilDate = this.datePipe.transform(this.untilDate, 'dd/MM/yyyy')
        this.fromDate = this.datePipe.transform(this.fromDate, 'dd/MM/yyyy')
        this.GetEmployeeDetails(this.systemGuid, this.fromDate, this.untilDate, 1)
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
    this.colorArrTaskOpenCopy = [...this.employeeDetailsOpenTask]
    this.colorArrTaskOpen = [];
    let a = 0;
    this.colorArrTaskOpenCopy.forEach(i => {
      if (i < 11) {
        this.colorArrTaskOpen[a] = "green";
      } else
        if (i > 11 && i < 25) {
          this.colorArrTaskOpen[a] = "blue";
        }
        else
          if (i > 26 && i < 110) {
            this.colorArrTaskOpen[a] = "red";
          }
      // else
      //   if (i > 111 && i < 150) {
      //     this.colorArrTaskOpen[a] = "rgb(6, 142, 6)";
      //   }
      //   else
      //   if (i > 151) {
      //     this.colorArrTaskOpen[a] = "rgb(10, 179, 10)";
      //   }
      a++;
    })
  }
}
