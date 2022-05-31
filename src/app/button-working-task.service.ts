import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonWorkingTaskService {
  private kindOfButton$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setSpecificButton(data: string, type: boolean) {
    var obj = {
      start: data === 'start' ? type : false,
      pouse: data === 'pouse' ? type : false,
      end: data === 'end' ? type : false,
      chooseAnotherTask: data === 'chooseAnotherTask' ? type : false,

    }
    this.setKindOfButton(obj)
  }
  setKindOfButton(data: any) {
    this.kindOfButton$.next(data)
  }
  getKindOfButton() {
    return this.kindOfButton$;
  }
}
