import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Regardingobjectid } from './interfacees/regardingobjectid';
import { WorkType } from './interfacees/work-type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  GetMyTask(userMail: string) {
    return this.http.get<any>(environment.url+'/GetTask/?AccountEmail='+userMail)
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
  UpdateProjectContentItem(duration:string,taskId:string,isTaskAccomplished:boolean) {
    return this.http.get<any>(environment.url + 'UpdateProjectContentItem/?taskId='+taskId+'&duration='+duration+'&IsTaskAccomplished='+isTaskAccomplished);
  }
  GetProjectContentItemByTaskGuid(taskId:string){
    return this.http.get<any>(environment.url + 'GetProjectContentItemByTaskGuid/?TaskId='+taskId);

  }
}
