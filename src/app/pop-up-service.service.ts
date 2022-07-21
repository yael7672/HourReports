import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpServiceService {

  private kindOfPopUp$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }
  
  setSpecificPopUp(data: boolean, type: string) {
    var obj = {
      login: type === 'login' ? data : false,
      pause: type === 'pause'? data : false,
      creatTask: type === 'creatTask' ? data : false,
      updateTask: type === 'updateTask' ? data : false,
      endTask: type === 'endTask' ? data : false,
      MyprojectContentItem:type === 'MyprojectContentItem' ? data : false,
      Logout: type === 'Logout' ? data : false,

      UpdateProjectContentItemDetails:type === 'UpdateProjectContentItemDetails' ? data : false,

      ceateAprojectContentItem: type === 'createAprojectContentItem' ? data : false,
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

  setgetAllmyTask() {
    this.kindOfPopUp$.next(false)
  }
  getgetAllmyTask() {
    return this.kindOfPopUp$;
  }
 
  setgetAllmyProjectContectItem() {
    this.kindOfPopUp$.next(false)
  }
  getgetAllmyProjectContectItem() {
    return this.kindOfPopUp$;
  }
  SetGetProjectContentItemByTaskGuid()
  {
    this.kindOfPopUp$.next(false)
  }
  GetGetProjectContentItemByTaskGuid()
  {
    return this.kindOfPopUp$;
  }
}
