import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.css']
})
export class TeamReportComponent implements OnInit {
  teamReportListKeys = ['TeamName',['TeamMemmber','Name']]
  thArrTeamReport = [ 'שם הצוות','חברים בצוות'];
  teamsDetails: any;
  ifSortDown = false;
  systemGuid: any;
  showGraph = true
  ifShowAndEditEmployeeSetting = true
  isPopUpOpen: any;
  teamsDetailsVal: any;
  title = "דו'ח צוותים";
  teamsDetailsCopy: any;
  constructor(private userService: UserServiceService, public route: Router
    , public popUpService: PopUpServiceService, private appService: AppService) {
    this.popUpService.getKindOfPopUp().subscribe(res => {
      this.isPopUpOpen = res;
      console.log("isPopUpOpen - subScriber", this.isPopUpOpen);
    })
  }
  ngOnInit(): void {
    this.GetTeamDetails()
  }
  GetTeamDetails() {
    this.userService.GetTeamDetails().subscribe(
      (res: any) => {
        this.teamsDetails = res;
        this.teamsDetailsCopy = res;
        console.log( this.teamsDetails);

      },
      (err: any) =>
        console.log(err.error)
    )
  }
  SortTableDown(thName: any) {
    this.ifSortDown = false;
    let keyToSort: any;
    switch (thName) {
      case 'שם הצוות':
        keyToSort = 'TeamName';
        break;
        case 'חברים בצוות':
          keyToSort = 'TeamMemmber';
        break;
      
      default:
        break;
    }
    if (keyToSort != 'TeamMemmber') {
      this.teamsDetails?.sort((a: any, b: any) =>
        (a[keyToSort] > (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.teamsDetails?.sort((a: any, b: any) =>
        (a[keyToSort[1]] > (b[keyToSort[1]])) ? 1 : -1)
    }
  }
  SortTableUp(thName: any) {
    this.ifSortDown = true;
    let keyToSort: any;
    switch (thName) {
      case 'שם הצוות':
        keyToSort = 'TeamName';
        break;
      case 'חברים בצוות':
        keyToSort = 'TeamMemmber';
        break;
    
      default:
        break;
    }
    if (keyToSort != 'TeamMemmber') {
      this.teamsDetails?.sort((a: any, b: any) =>
        (a[keyToSort] < (b[keyToSort])) ? 1 : -1)
    }
    else {
      this.teamsDetails?.sort((a: any, b: any) =>
        (a[keyToSort[1]] < (b[keyToSort[1]])) ? 1 : -1)
    }
  }

  openProjectContentItemByEmployeeGuid(val: any) {
    this.route.navigate(['/menu/project-contect-items-by-employee', val.EmployeeGuid])
    localStorage.setItem('teamsDetails', JSON.stringify(val))
  }
  openTasksByTeamGuid(val: any) {
  this.route.navigate(['/menu/tasks-by-team', val.Guid])

    localStorage.setItem('teamsDetails', JSON.stringify(val))
  }

  editTeamDetailsByAdmin(val: any) {
    this.teamsDetailsVal = val
    this.appService.setIsPopUpOpen(true);
    this.popUpService.setSpecificPopUp(true, "EditEmployeeDetailsByAdmin")

    localStorage.setItem('teamsDetails', JSON.stringify(val))
  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.route.navigate(['/menu/employee-report'])
    }
    if (val == 1) {
      this.route.navigate(['/menu/team-report'])
    }
  }
  onSearchTeam(filterKeyBySubject: any) {
    this.teamsDetails = [...this.teamsDetailsCopy];
    if (filterKeyBySubject !== "" && filterKeyBySubject !== null && filterKeyBySubject !== undefined) {
      this.teamsDetails = this.teamsDetails.filter((f: any) => f?.TeamName.includes(filterKeyBySubject));
    }
    else {
      if (filterKeyBySubject == "" || filterKeyBySubject == null || filterKeyBySubject !== undefined) {
        this.teamsDetails = [...this.teamsDetailsCopy];
      }
    }
  }}
