import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Task } from 'src/app/interfacees/task';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-search-and-sort-tasks',
  templateUrl: './search-and-sort-tasks.component.html',
  styleUrls: ['./search-and-sort-tasks.component.css']
})
export class SearchAndSortTasksComponent implements OnInit {
  systemGuid: any;

  constructor(public route: Router, private userService: UserServiceService,private activatedRoute:ActivatedRoute) { }
  @Input() taskArr!: Task[]
  @Input() taskArrCopy: any
  projectArr: any;
  ngOnInit(): void {

  }
  WhichTableOpen(val: any) {
    if (val == 0) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/show-my-task',this.systemGuid]);
    }
    if (val == 1) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/show-team-my-task/',this.systemGuid]);
    }
    if (val == 2) {
      this.systemGuid = this.activatedRoute.snapshot.paramMap.get('id');
      this.route.navigate(['/the-last-tasks-i-worked']);
    }
  }
  GetProject() {
    this.userService.GetProject().subscribe(res => {
      if (res) {
        this.projectArr = res;
      }
    },
      err => {
        console.log(err.error);
      })
  }
  onSearchTask(filterKeyBySubject: any) {
    this.taskArr = [...this.taskArrCopy];
    if (filterKeyBySubject !== "" && filterKeyBySubject !== null && filterKeyBySubject !== undefined) {
      this.taskArr = this.taskArr.filter((f: Task) => f.Subject?.includes(filterKeyBySubject));
    }
    else {
      if (filterKeyBySubject == "" || filterKeyBySubject == null || filterKeyBySubject !== undefined) {
        this.taskArr = [...this.taskArrCopy];
      }
    }
  }
  onSearchProject(filterKey: any) {
    this.taskArr = [...this.taskArrCopy];
    if (filterKey !== "" && filterKey !== null && filterKey !== undefined) {
      this.taskArr = this.taskArr.filter((f: Task) => f.Project?.Name.includes(filterKey.Name));
    }
  }
}
