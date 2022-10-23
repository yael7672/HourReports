import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../interfacees/project';
import { ProjectContentItem } from '../interfacees/project-content-item';
import { ProjectToCreate } from '../interfacees/ProjectToCreate';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-specific-project-details',
  templateUrl: './specific-project-details.component.html',
  styleUrls: ['./specific-project-details.component.css']
})
export class SpecificProjectDetailsComponent implements OnInit {
  todayDate: any;
  myDate = Date.now()
  tabLink!: any[]
  id: any
  titleCard:any="פרטי פרויקט"
  constructor(private userService: UserServiceService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.tabLink = [
      { title: 'פריטי תכולת פרויקט לפי פרויקט', fragment: '/menu/project-contect-item-by-project/' + this.id },
      { title: 'כללי', fragment: '/menu/specific-project-details/' + this.id },

    ];
  }
  thArrProjectContectItemList = ['שם', 'תאריך', 'תאור', 'שעות לחיוב?', 'משך', 'סוג עבודה'];
  ProjectListKeys = ['Name', 'CreatedOn', 'Description', 'BillableHours', 'WorkingHours', ['WorkType', 'Name']];
  systemGuid: any;
  projectGuid: any;
  selectedTime: any;
  ProjectArr!:ProjectToCreate


  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');;
    this.projectGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetProjectByGuid()

  }

  GetProjectByGuid(){
      this.userService.GetProjectByGuid(this.systemGuid, this.projectGuid).then(res => {
        if (res) {
          this.ProjectArr = res;
        }
      },
        err => {
          console.log(err.error);
        })
    
  }
}
