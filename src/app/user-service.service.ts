import { HttpClient } from '@angular/common/http';
import { Injectable , Pipe } from '@angular/core/core';
// import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Acccount } from './interfacees/Acccount';
import { averageBreaks } from './interfacees/averageBreaks';
import { ownerid } from './interfacees/ownerid';
import { Project } from './interfacees/project';
import { ProjectContentItem } from './interfacees/project-content-item';
import { ProjectToCreate } from './interfacees/ProjectToCreate';
import { ProjectType } from './interfacees/ProjectType';
import { Regardingobjectid } from './interfacees/regardingobjectid';
import { TaskByGuid } from './interfacees/TaskByGuid';
import { User } from './interfacees/user';
import { WorkType } from './interfacees/work-type';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  a!: string
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
  UpdateTaskDetails(taskId: any, ProjectGuid: any, DescriptionTask: string, TaskSubject: string, WorkType: any, AssignTask: any) {
    this.a = environment.url + '/UpdateTaskDetails/?OrganizationName=AuroraProd&taskId=' + taskId + '&ProjectGuid=' + ProjectGuid + '&DescriptionTask=' + DescriptionTask + '&TaskSubject=' + TaskSubject + '&WorkType=' + WorkType + '&AssignTask=' + AssignTask;
    console.log(this.a);

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
  logIn(email: any, password: any) {
    return this.http.get<User[]>(environment.url + 'Login?OrganizationName=AuroraProd&email=' + email + '&password=' + password);
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
  GetMyProjectContectItem(SystemGuid: any, SelectedTime: number, FromDate: string, UntilDate: string, SpecificDate: string) {

    return this.http.get<ProjectContentItem[]>(environment.url + '/GetMyProjectContectItems?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate + '&SpecificDate=' + SpecificDate)

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

  GetEmployeeDetails(SystemGuid: string, fromDate: any, untilDate: any) {
    return this.http.get<any>(environment.url + 'GetEmployeeDetails?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&FromDate=' + fromDate + '&UntilDate=' + untilDate)
  }
  ApprovalPojectContentItem(obj: any) {
    return this.http.post<any>(environment.url + 'ApprovalPojectContentItem', obj)
  }

  GetTeamDetails() {
    return this.http.get<any>(environment.url + 'GetTeamDetails?OrganizationName=AuroraProd')
  }
  GetMyNewTasks(SystemGuid: string) {
    return this.http.get<any>(environment.url + 'GetMyNewTasks/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid)
  }
  UpdateTaskHasRead(SystemGuid: string, TaskGuid: string) {
    return this.http.get<any>(environment.url + 'UpdateTaskHasRead/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&TaskGuid=' + TaskGuid)
  }
  async GetActualTimeAndWorkTime(SystemGuid: string, SelectedTime: any, fromDate: any, untilDate: any) {
    return await this.http.get<any>(environment.url + 'GetActualTimeAndWorkTime/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + fromDate + '&UntilDate=' + untilDate).toPromise();
  }
  async GetWorkTimeByWorkType(SystemGuid: string, SelectedTime: any, fromDate: any, untilDate: any) {
    return await this.http.get<any>(environment.url + 'GetWorkTimeByWorkType/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + fromDate + '&UntilDate=' + untilDate).toPromise();
  }
  UpdateEmployeeDetails(EmployeeDetails: any) {
    return this.http.post<any>(environment.url + 'UpdateEmployeeDetails?OrganizationName=AuroraProd', EmployeeDetails);
  }
  MessageToTheManager() {
    return this.http.get<any>(environment.url + 'MessageToTheManager');
  }
  DeleteTaskByGuid(TaskId: any) {
    return this.http.delete<any>(environment.url + 'DeleteTaskByGuid?OrganizationName=AuroraProd&TaskId=' + TaskId)
  }
  GetAllEmployee(adminGuid: any) {
    return this.http.get<ownerid[]>(environment.url + 'GetEmployees?OrganizationName=AuroraProd' + '&adminGuid=' + adminGuid);
  }
  GetTaskByTeamGuid(TeamGuid: string) {
    return this.http.get<any>(environment.url + 'GetTaskByTeamGuid/?OrganizationName=AuroraProd&TeamGuid=' + TeamGuid)
  }
  AddNewProject(project: ProjectToCreate) {
    return this.http.post<string>(environment.url + 'AddNewProject?OrganizationName=AuroraProd', project);
  }
  GetProjectsBySystemUser(SystemGuid: any, Status: any) {
    return this.http.get<any>(environment.url + 'GetProjectsBySystemUser/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&Status=' + Status)
  }

  GetDetailsOfWorkingHourByEmployee(SystemGuid: string, SelectedTime: number, FromDate: string, UntilDate: string) {
    return this.http.get<any>(environment.url + 'GetDetailsOfWorkingHourByEmployee/?OrganizationName=AuroraProd&SystemGuid=' + SystemGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate)
  }
  GetAccount() {
    return this.http.get<Acccount[]>(environment.url + 'GetAccount/?OrganizationName=AuroraProd')
  }
  GetProjectType() {
    return this.http.get<ProjectType[]>(environment.url + 'GetProjectTypes/?OrganizationName=AuroraProd')
  }
  async GetProjectContectItemByProjectAndBySystemUser(SystemUser: any, projectGuid: any, SelectedTime: any, FromDate: any, UntilDate: any) {
    return await this.http.get<any>(environment.url + 'GetProjectContectItemByProjectAndBySystemUser/?OrganizationName=AuroraProd&SystemUser=' + SystemUser + '&Project=' + projectGuid + '&SelectedTime=' + SelectedTime + '&FromDate=' + FromDate + '&UntilDate=' + UntilDate).toPromise();

  }
  async GetProjectByGuid(SystemUser: any, GuidProject: any) {
    return await this.http.get<any>(environment.url + 'GetProjectByGuid/?OrganizationName=AuroraProd&SystemUser=' + SystemUser + '&GuidProject=' + GuidProject).toPromise();

  }

}
