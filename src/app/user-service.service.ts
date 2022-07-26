import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { averageBreaks } from './interfacees/averageBreaks';
import { Project } from './interfacees/project';
import { ProjectContentItem } from './interfacees/project-content-item';
import { Regardingobjectid } from './interfacees/regardingobjectid';
import { TaskByGuid } from './interfacees/TaskByGuid';
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
  async AddNewTask(TaskObj: any) {
    return await this.http.post<string>(environment.url + '/AddNewTask', TaskObj).toPromise();
  }
  GetWorkType() {
    return this.http.get<WorkType[]>(environment.url + 'GetWorkType');
  }
  GetRegarding() {
    return this.http.get<Regardingobjectid[]>(environment.url + 'GetRegarding');
  }
  UpdateProjectContentItem(duration: string, taskId: string, isTaskAccomplished: boolean, descriptionTask: string) {
    return this.http.get<any>(environment.url + 'UpdateProjectContentItem/?taskId=' + taskId + '&duration=' + duration + '&IsTaskAccomplished=' + isTaskAccomplished + '&DescriptionTask=' + descriptionTask);
  }
  async GetProjectContentItemByTaskGuid(taskId: string) {
    return await this.http.get<any>(environment.url + 'GetProjectContentItemByTaskGuid/?TaskId=' + taskId).toPromise();
  }
  GetProject() {
    return this.http.get<any>(environment.url + 'GetProject/');
  }
  CreateProjectContentItemByTaskGuid(SystemGuid: string, TaskGuid: string, IftaskForTeam: boolean) {
    return this.http.get<any>(environment.url + 'CreateProjectContentItemByTaskGuid/?SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid + '&IftaskForTeam=' + IftaskForTeam);
  }
  logIn(email: any) {
    return this.http.get<User[]>(environment.url + 'Login/?email=' + email);
  }
  CreatePauseWork(SystemGuid: any) {
    return this.http.get<any>(environment.url + 'CreateNewProjectItemPause?SystemGuid=' + SystemGuid);

  }
  // לשנות- לממשק של יצירת פריט תכולת פרויקט רגיל
  CreateNewProjectItemByGuid(projectContentItem: any) {
    return this.http.get<ProjectContentItem[]>(environment.url + 'Login=' + projectContentItem);

  }
  CreateNewProjectItem(projectContentItem: any, fromDate: string, untilDate: string) {
    return this.http.post<string>(environment.url + 'CreateProjectContentItem?FromDate=' + fromDate + '&UntilDate=' + untilDate, projectContentItem);
  }
  async PauseWork(SystemGuid: any, ActualTime: any) {
    return await this.http.get<string>(environment.url + 'UpdateProjectContectItemPauseHours?SystemGuid=' + SystemGuid + '&ActualTime=' + ActualTime).toPromise();

  }
  async GetMyProjectContentItemByTime(SystemGuid: string, FromDate: string, UntilDate: string, SelectedTime: number) {
    return await this.http.get<any>(environment.url + 'GetMyProjectContentItemByTime?SystemGuid=' + SystemGuid + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate + '&SelectedTime=' + SelectedTime).toPromise();

  }
  GetTaskByGuid(SystemGuid: any, TaskGuid: any) {
    return this.http.get<TaskByGuid>(environment.url + 'GetTaskByGuid?SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid);

  }
  GetActualTaskHours(SystemGuid: any, TaskGuid: any) {
    return this.http.get<TaskByGuid>(environment.url + 'GetActualTaskHours?SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid);
  }
  async GetAverageBreaks(SystemGuid: any, FromDate: string, UntilDate: string, SelectedTime: any) {
    return await this.http.get<averageBreaks>(environment.url + 'GetAverageBreaks?SystemGuid=' + SystemGuid + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate + '&SelectedTime=' + SelectedTime).toPromise();
  }
  GetTaskForMyTeams(SystemGuid: any) {
    return this.http.get<any>(environment.url + '/GetTaskForMyTeams/?SystemGuid=' + SystemGuid)
  }
  UpdateProjectContentItemDetails(ProjectItemToUpdate: any) {
    return this.http.post<string>(environment.url + '/UpdateProjectContentItemDetails', ProjectItemToUpdate);

  }
  GetMyProjectContectItem(SystemGuid: any, SelectedTime: number) {

    return this.http.get<ProjectContentItem[]>(environment.url + '/GetMyProjectContectItems/?SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime)

  }
  GetProjectContentItemByGuid(projectContectItemGuid: string) {
    return this.http.get<any>(environment.url + '/GetProjectContentItemByGuid/?ProjectContentItemGuid=' + projectContectItemGuid)

  }
}
