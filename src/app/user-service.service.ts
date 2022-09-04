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
    return this.http.get<any>(environment.url + 'GetTask/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
  GetDailyWorkingHoursAndMonthlyWorkingHours(SystemGuid: string) {
    return this.http.get<any>(environment.url + 'GetDailyWorkingHoursAndMonthlyWorkingHours/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }

  CreateProjectContectItemWithTimer(SystemGuid: string) {
    return this.http.get<any>(environment.url + '/CreateProjectContectItemWithTimer/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
  UpdateProjectContectItemWithTime(ProjectItemToUpdate: ProjectContentItem) {
    return this.http.post<string>(environment.url + '/UpdateProjectContectItemWithTimer/?OrganizationName=AuroraProd', ProjectItemToUpdate);

  }
  UpdateTaskDetails(taskId: any, ProjectGuid: any, DescriptionTask: any, TaskSubject: any, WorkType: any, AssignTask: any) {
    return this.http.get<any>(environment.url + '/UpdateTaskDetails/?OrganizationName=AuroraProd&taskId=' + taskId + '&ProjectGuid=' + ProjectGuid + '&DescriptionTask=' + DescriptionTask + '&TaskSubject=' + TaskSubject + '&WorkType=' + WorkType + '&AssignTask=' + AssignTask);
  }
  async AddNewTask(TaskObj: any) {
    return await this.http.post<string>(environment.url + 'AddNewTask?OrganizationName=AuroraProd', TaskObj).toPromise();
  }
  GetWorkType() {
    return this.http.get<WorkType[]>(environment.url + 'GetWorkType?OrganizationName=AuroraProd');
  }
  GetRegarding() {
    return this.http.get<Regardingobjectid[]>(environment.url + 'GetRegarding?OrganizationName=AuroraProd');
  }
  UpdateProjectContentItem(duration: string, taskId: string, isTaskAccomplished: boolean, descriptionTask: string) {
    return this.http.get<any>(environment.url + 'UpdateProjectContentItem/?OrganizationName=AuroraProd&taskId=' + taskId + '&duration=' + duration + '&IsTaskAccomplished=' + isTaskAccomplished + '&DescriptionTask=' + descriptionTask);
  }
  async GetProjectContentItemByTaskGuid(taskId: string) {
    return await this.http.get<any>(environment.url + 'GetProjectContentItemByTaskGuid/?OrganizationName=AuroraProd&TaskId=' + taskId).toPromise();
  }
  GetProject() {
    return this.http.get<any>(environment.url + 'GetProject/?OrganizationName=AuroraProd');
  }
  CreateProjectContentItemByTaskGuid(SystemGuid: string, TaskGuid: string, IftaskForTeam: boolean) {
    return this.http.get<any>(environment.url + 'CreateProjectContentItemByTaskGuid/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid + '&IftaskForTeam=' + IftaskForTeam);
  }
  logIn(email: any) {
    return this.http.get<User[]>(environment.url + 'Login?OrganizationName=AuroraProd&email=' + email);
  }
  CreatePauseWork(SystemGuid: any) {
    return this.http.get<any>(environment.url + 'CreateNewProjectItemPause?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid);
  }

  CreateNewProjectItem(projectContentItem: any, fromDate: string, untilDate: string) {
    return this.http.post<string>(environment.url + 'CreateProjectContentItem?OrganizationName=AuroraProd&FromDate=' + fromDate + '&UntilDate=' + untilDate, projectContentItem);
  }
  async PauseWork(SystemGuid: any, ProjectContectItemPauseGuid: any, ActualTime: any) {
    return await this.http.get<string>(environment.url + 'UpdateProjectContectItemPauseHours?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&ProjectContectItemPauseGuid=' + ProjectContectItemPauseGuid + '&ActualTime=' + ActualTime).toPromise();

  }
  async GetMyProjectContentItemByTime(SystemGuid: string, FromDate: string, UntilDate: string, SelectedTime: number) {
    return await this.http.get<any>(environment.url + 'GetMyProjectContentItemByTime?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate + '&SelectedTime=' + SelectedTime).toPromise();

  }
  GetTaskByGuid(SystemGuid: any, TaskGuid: any) {
    return this.http.get<TaskByGuid>(environment.url + 'GetTaskByGuid?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid);

  }
  GetActualTaskHours(SystemGuid: any, TaskGuid: any) {
    return this.http.get<TaskByGuid>(environment.url + 'GetActualTaskHours?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid);
  }
  async GetAverageBreaks(SystemGuid: any, FromDate: string, UntilDate: string, SelectedTime: any) {
    return await this.http.get<averageBreaks>(environment.url + 'GetAverageBreaks?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate + '&SelectedTime=' + SelectedTime).toPromise();
  }
  GetTaskForMyTeams(SystemGuid: any) {
    return this.http.get<any>(environment.url + 'GetTaskForMyTeams/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
  UpdateProjectContentItemDetails(ProjectItemToUpdate: any) {
    return this.http.post<string>(environment.url + 'UpdateProjectContentItemDetails?OrganizationName=AuroraProd', ProjectItemToUpdate);
  }
  GetMyProjectContectItem(SystemGuid: any, SelectedTime: number, FromDate: string, UntilDate: string) {

    return this.http.get<ProjectContentItem[]>(environment.url + '/GetMyProjectContectItems?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate)

  }
  GetProjectContentItemByGuid(projectContectItemGuid: string) {
    return this.http.get<any>(environment.url + '/GetProjectContentItemByGuid/?OrganizationName=AuroraProd&ProjectContentItemGuid=' + projectContectItemGuid)
  }
  DeleteProjectContentItemByGuid(projectContectItemGuid: string) {
    return this.http.delete<any>(environment.url + 'DeleteProjectContentItemByGuid?OrganizationName=AuroraProd&ProjectContentItemGuid=' + projectContectItemGuid)

  }
  GetHoursAwaitingApproval(SystemGuid: string) {
    return this.http.get<any>(environment.url + 'GetHoursAwaitingApproval?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
  GetAllUserAndTeams() {
    return this.http.get<any>(environment.url + 'GetAllUserAndTeams?OrganizationName=AuroraProd')
  }
  GetEmployeeDetails(SystemGuid: string) {
    return this.http.get<any>(environment.url + 'GetEmployeeDetails?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
}
