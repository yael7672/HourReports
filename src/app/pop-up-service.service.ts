import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OpenTask } from './interfacees/OpenTask';

@Injectable({
  providedIn: 'root'
})
export class PopUpServiceService {

  private isStartTimer$: BehaviorSubject<any> = new BehaviorSubject(null);
  private kindOfPopUp$: BehaviorSubject<any> = new BehaviorSubject(null);
  private refreshMyprojectContentItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshCeateAprojectContentItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshGetAllMyTask$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ifStartPouse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ifClosePouse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private WorkTime$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private IfXProjectContectItemUpdateWithTime$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshGetAllMyNewTask$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private navBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private detailsOfWorkingHoursEmployeeForAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private detailsOfWorkingHoursEmployee$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private middlePause$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isOpenTask$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  private ifInTheMiddleOfWorkingOnATask$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  OpenTask: OpenTask[] = []

  constructor() { }

  setSpecificPopUp(data: boolean, type: string) {
    var obj = {
      login: type === 'login' ? data : false,
      pause: type === 'pause' ? data : false,
      creatTask: type === 'creatTask' ? data : false,
      updateTask: type === 'updateTask' ? data : false,
      endTask: type === 'endTask' ? data : false,
      Logout: type === 'Logout' ? data : false,
      sickLeave: type === 'sickLeave' ? data : false,
      Freedom: type === 'Freedom' ? data : false,
      HoursAwaitingApproval: type === 'HoursAwaitingApproval' ? data : false,
      timeOfProjectContectItem: type === 'timeOfProjectContectItem' ? data : false,
      UpdateProjectContentItemDetails: type === 'UpdateProjectContentItemDetails' ? data : false,
      ceateAprojectContentItem: type === 'createAprojectContentItem' ? data : false,
      DeleteProjectContentItemIcon: type === 'DeleteProjectContentItemIcon' ? data : false,
      EditEmployeeDetailsByAdmin: type === 'EditEmployeeDetailsByAdmin' ? data : false,
      MyNewTask: type === 'MyNewTask' ? data : false,
      DeleteTask: type === 'DeleteTask' ? data : false,
      MessageToTheManager: type === 'MessageToTheManager' ? data : false,
      ProjectContentItemBySpesificDate: type === 'ProjectContentItemBySpesificDate' ? data : false,
      AddProject: type === 'AddProject' ? data : false,
      AddUser: type === 'AddUser' ? data : false,

    }
    this.setKindOfPopUp(obj)
  }
  setKindOfPopUp(data: any) {
    this.kindOfPopUp$.next(data)
  }
  getKindOfPopUp() {
    return this.kindOfPopUp$;
  }
  setClosePopUp() {
    this.kindOfPopUp$.next(false)
  }
  setAllmyTask(val: boolean) {
    this.refreshGetAllMyTask$.next(val)
  }
  getAllmyTask() {
    return this.refreshGetAllMyTask$;
  }
  setNavBar(val: boolean) {
    this.navBar$.next(val)
  }
  getNavBar() {
    return this.navBar$;
  }
  setAllMyNewTask(val: boolean) {
    this.refreshGetAllMyNewTask$.next(val)
  }
  getAllMyNewTask() {
    return this.refreshGetAllMyNewTask$;
  }
  setAllmyProjectContectItem(val: boolean) {
    this.refreshMyprojectContentItem$.next(val)
  }
  getAllmyProjectContectItem() {
    return this.refreshMyprojectContentItem$;
  }
  SetProjectContentItemByTaskGuid(val: boolean) {
    this.refreshCeateAprojectContentItem$.next(val)
  }
  GetProjectContentItemByTaskGuid() {
    return this.refreshCeateAprojectContentItem$;
  }
  SetIfStartPouse(val: boolean) {
    this.ifStartPouse$.next(val)
  }
  GetIfStartPouse() {
    return this.ifStartPouse$;
  }
  SetIfClosePouse(val: boolean) {
    this.ifClosePouse$.next(val)
  }
  GetIfClosePouse() {
    return this.ifClosePouse$;
  }
  SetWorkTimeAfterProjectContectItem(val: boolean) {
    this.WorkTime$.next(val)
  }
  GetWorkTimeAfterProjectContectItem() {
    return this.WorkTime$;
  }
  SetIfXProjectContectItemUpdateWithTime(val: boolean) {
    this.IfXProjectContectItemUpdateWithTime$.next(val)
  }
  GetIfXProjectContectItemUpdateWithTime() {
    return this.IfXProjectContectItemUpdateWithTime$;
  }
  setStartTimer(val: boolean) {
    this.isStartTimer$.next(val);
  }
  getStartTimer() {
    return this.isStartTimer$;
  }
  setDetailsOfWorkingHoursEmployeeForAdmin(val: boolean) {
    this.detailsOfWorkingHoursEmployeeForAdmin$.next(val);
  }
  getDetailsOfWorkingHoursEmployeeForAdmin() {
    return this.detailsOfWorkingHoursEmployeeForAdmin$;
  }
  setDetailsOfWorkingHoursEmployee(val: boolean) {
    this.detailsOfWorkingHoursEmployee$.next(val);
  }
  getDetailsOfWorkingHoursEmployee() {
    return this.detailsOfWorkingHoursEmployee$;
  }
  setInPause(val: boolean) {
    this.middlePause$.next(val);
  }
  getInPause() {
    return this.middlePause$;
  }
  setIsAdminMode(event: boolean) {
    this.isAdminMode$.next(event);
  }
  getIsAdminMode() {
    return this.isAdminMode$;
  }

  setOpenTaskPopUp(ProjectContectItemGuid: any, TaskGuid: any, TimeTask: any, ParseTime: any, Type: any) {
    this.OpenTask.push({ ProjectContectItemGuid: ProjectContectItemGuid, TaskGuid: TaskGuid, TimeTask: TimeTask, ParseTime: ParseTime, Type: Type })
    this.isOpenTask$.next(this.OpenTask);
  }
  getOpenTaskPopUp() {
    return this.isOpenTask$;
  }
  setifInTheMiddleOfWorkingOnATask(val:boolean) {
    return this.ifInTheMiddleOfWorkingOnATask$.next(val);
  }
  getifInTheMiddleOfWorkingOnATask() {
    return this.ifInTheMiddleOfWorkingOnATask$;
  }
}
