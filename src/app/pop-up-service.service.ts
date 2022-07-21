import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpServiceService {

  private kindOfPopUp$: BehaviorSubject<any> = new BehaviorSubject(null);
  private refreshMyprojectContentItem$ :BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  private refreshUpdateProjectContentItemDetails$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;
  private refreshCeateAprojectContentItem$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private refreshGetAllMyTask$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ifStartPouse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private ifClosePouse$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  setSpecificPopUp(data: boolean, type: string) {
    var obj = {
      login: type === 'login' ? data : false,
      pause: type === 'pause'? data : false,
      creatTask: type === 'creatTask' ? data : false,
      updateTask: type === 'updateTask' ? data : false,
      endTask: type === 'endTask' ? data : false,
      Logout: type === 'Logout' ? data : false,
      // MyprojectContentItem:type === 'MyprojectContentItem' ? data : false,
      // UpdateProjectContentItemDetails:type === 'UpdateProjectContentItemDetails' ? data : false,
      // ceateAprojectContentItem: type === 'createAprojectContentItem' ? data : false,
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
  getClosePopUp() {
    return this.kindOfPopUp$;
  }

  setAllmyTask(val:boolean) {
    this.refreshGetAllMyTask$.next(val)
  }
  getAllmyTask() {
    return this.refreshGetAllMyTask$;
  }
 
  setAllmyProjectContectItem(val:boolean) {
    this.refreshMyprojectContentItem$.next(val)
  }
  getAllmyProjectContectItem() {
    return this.refreshMyprojectContentItem$;
  }
  SetProjectContentItemByTaskGuid(val:boolean)
  {
    this.refreshCeateAprojectContentItem$.next(val)
  }
  GetProjectContentItemByTaskGuid()
  {
    return this.refreshCeateAprojectContentItem$;
  }
  SetIfStartPouse(val:boolean)
  {
    this.ifStartPouse$.next(val)
  }
  GetIfStartPouse()
  {
    return this.ifStartPouse$;
  }
  SetIfClosePouse(val:boolean)
  {
    this.ifClosePouse$.next(val)
  }
  GetIfClosePouse()
  {
    return this.ifClosePouse$;
  }
}
