import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Project } from './interfacees/project';
import { ProjectContentItem } from './interfacees/project-content-item';
import { Regardingobjectid } from './interfacees/regardingobjectid';
import { User } from './interfacees/user';
import { WorkType } from './interfacees/work-type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  GetMyTask(SystemGuid: string) {
    return this.http.get<any>(environment.url + '/GetTask/?SystemGuid=' + SystemGuid)
  }
  AddNewTask(TaskObj: any) {
    return this.http.post<string>(environment.url + '/AddNewTask', TaskObj);
  }
  GetWorkType() {
    return this.http.get<WorkType[]>(environment.url + 'GetWorkType');
  }
  GetRegarding() {
    return this.http.get<Regardingobjectid[]>(environment.url + 'GetRegarding');
  }
  UpdateProjectContentItem(duration: string, taskId: string, isTaskAccomplished: boolean) {
    return this.http.get<any>(environment.url + 'UpdateProjectContentItem/?taskId=' + taskId + '&duration=' + duration + '&IsTaskAccomplished=' + isTaskAccomplished);
  }
  GetProjectContentItemByTaskGuid(taskId: string) {
    return this.http.get<any>(environment.url + 'GetProjectContentItemByTaskGuid/?TaskId=' + taskId);
  }
  GetProject() {
    return this.http.get<any>(environment.url + 'GetProject/');
  }
  CreateProjectContentItemByTaskGuid(SystemGuid: string, TaskGuid: string) {
    return this.http.get<any>(environment.url + 'CreateProjectContentItemByTaskGuid/?SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid);
  }
  logIn(email: any) {
    return this.http.get<User[]>(environment.url + 'Login/?email=' + email);
  }
  PauseWork(SystemGuid:any ,ActualTime:any){
    return this.http.get<any>(environment.url + 'CreateNewProjectItemPause?SystemGuid='+ SystemGuid + "&ActualTime="+ ActualTime);

  }
  // לשנות- לממשק של יצירת פריט תכולת פרויקט רגיל
  CreateNewProjectItemByGuid(projectContentItem:any){
    return this.http.get<ProjectContentItem[]>(environment.url + 'Login='+ projectContentItem);

  }
  CreateNewProjectItem(projectContentItem:any){
    return this.http.post<string>(environment.url + 'CreateNewProjectItem' , projectContentItem);
  }

}
