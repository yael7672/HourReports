import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ownerid } from '../interfacees/ownerid';
import { Project } from '../interfacees/project';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-projects-by-employee',
  templateUrl: './projects-by-employee.component.html',
  styleUrls: ['./projects-by-employee.component.css']
})
export class ProjectsByEmployeeComponent implements OnInit {
  ActiveProjectArr !: Project[];
  thArrTask = ["שם", "נושא", "תיאור", "לקוח", "סוג פרויקט", " איש קשר בפרויקט", "מנהל פרויקט", "מפתח ראשי", "שעות לאישור", "תאריך התחלה", "תאריך סיום"];
  ProjectListKeys = ['Name', 'Subject', 'Description', ['Account', 'Name'], ['ProjectType', 'Name'], ['ContactInProject', 'Name'], ['ProjectManager', 'Name'], ['HeadProgrammer', 'Name'], 'ConfirmedHours', 'StartDate', 'EndDate'];
  systemGuid: any;
  systemGuidFromLocalStorage: any;
  adminGuid: any
  ProjectManagerOrHeadProgrammerArr!: ownerid[];
  ProjectManagerOrHeadProgrammerArrCopy!: ownerid[];
  showMyActiveProjects = true
  showAllMyProject = false
  showProjectByEmployeeGuid = false
  constructor(private userService: UserServiceService, private activatedRoute: ActivatedRoute
   , private route:Router) { }


  ngOnInit(): void {
    this.systemGuidFromLocalStorage = localStorage.getItem('systemGuid');
    // this.systemGuidFromParems = this.activatedRoute.snapshot.paramMap.get('id');
    this.systemGuid = localStorage.getItem('systemGuid');;
    this.GetAllEmployee()
    this.getMyProject()
  }
  WhichTableProjectOpen(val: any) {
    if (val == 1) {
      this.showMyActiveProjects = true
      this.showAllMyProject = false
      this.showProjectByEmployeeGuid = false
    }
    if (val == 0) {
      this.showMyActiveProjects = false
      this.showAllMyProject = true
      this.showProjectByEmployeeGuid = false
    }
    if (val == 2) {
      this.showMyActiveProjects = false
      this.showAllMyProject = false
      this.showProjectByEmployeeGuid = true
    }

  }
  getMyProject() {
    this.userService.GetProjectsBySystemUser(this.systemGuid).subscribe(res => {
      if (res) {
        this.ActiveProjectArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  GetAllEmployee() {
    // לשים GUID אמיתי של מנהל
    this.adminGuid = ""
    this.userService.GetAllEmployee(this.adminGuid).subscribe(
      (res: any) => {
        this.ProjectManagerOrHeadProgrammerArr = res;

      },
      (err: any) =>
        console.log(err.error)
    )
  }
  onSearchEmployee(filterKey: any) {
    // this.ProjectManagerOrHeadProgrammerArr = [...this.ProjectManagerOrHeadProgrammerArrCopy];
    if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
      // this.ProjectManagerOrHeadProgrammerArr = this.ProjectManagerOrHeadProgrammerArr.filter((f: ownerid) => f?.Name.includes(filterKey.Name));
      this.systemGuid = filterKey.Guid
      this.getMyProject()
    }
    // this.getTaskAfterSort();

  }
  getTaskAfterSort() {
    // this.GetTaskAfterSort.emit(this.taskArr);
  }

  SelectedProject(specificProject: any) {
    console.log(specificProject)
    this.route.navigate(['/menu/specific-project-details',specificProject.Guid])

  }
}
