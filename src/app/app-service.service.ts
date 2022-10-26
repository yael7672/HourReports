import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DeviceDetectorService} from 'ngx-device-detector';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AppProperties } from './app-properties.interface';
@Injectable({
  providedIn: 'root'
})

export class AppService {
  private deviceInfo$: BehaviorSubject<any> = new BehaviorSubject(null);

  private isUnder1680$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isPopUpOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isDescriptionPanelOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private isSelectedTask$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private isRtl$ = new BehaviorSubject(false);

  private deviceInfo: any = null;

  private isUnder1680 = false;

  private isRtl: boolean = false;

  private isIE!: boolean;

  private isLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  
  constructor(@Inject(DOCUMENT) private document: Document, public deviceService: DeviceDetectorService) {
    this.startListeners();
    this.setScreenResize();
    this.setDeviceInfo();
  }

  startListeners() {
    // this.document.addEventListener('click', event => console.log('click', event));
    // this.document.addEventListener('input',  event => console.log('input', event));
    // this.document.addEventListener('change', event => console.log('change', event));
    // window.addEventListener('resize', () => this.setScreenResize());
    // window.addEventListener('beforeunload', event => this.beforeUnload(event));
  }

  setScreenResize() {
    this.isUnder1680 = window.innerWidth < 1680;
    this.isUnder1680$.next(window.innerWidth < 1100);
  }

  setDeviceInfo() {
    this.isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo$.next(this.deviceService.getDeviceInfo());
  }

  setIsRtl(event: boolean) {
    this.isRtl = event;
    this.isRtl$.next(event);
  }

  getIsRtl() {
    return this.isRtl$;
  }

  getDirectionString() {
    return this.isRtl ?  'rtl' : 'ltr';
  }

  /** get window setting as static properties **/
  getWindowSettings() {
    return {
      isUnder1680: this.isUnder1680,
      deviceInfo: this.deviceInfo,
      isIE: this.isIE,
      isRtl: this.isRtl,
      isDesktop: !(this.deviceService.isMobile() || this.deviceService.isTablet())
    };
  }

  getAppProperties(): AppProperties {     
    return {
      isUnder1680$: this.isUnder1680$,
      deviceInfo$: this.deviceInfo$,
      isIE: this.isIE,
      isRtl$: this.isRtl$,
      isDesktop: !(this.deviceService.isMobile() || this.deviceService.isTablet()),
      isPopUpOpen$: this.isPopUpOpen$
    };
  }

  getIsTablet() {
    return this.deviceService.isTablet();
  }

  getBrowserLangIsRtl(){
    const rtlLangs =
    ['ae', 'ar', 'arc', 'bcc',  'bqi', 'ckb', 'dv',  'fa',  'glk', 'he', 'ku',  'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi'];
    return !!rtlLangs.find(lang => lang.indexOf(navigator.language) === 0);
  }
  setIsPopUpOpen(event: boolean) {
    this.isPopUpOpen$.next(event);
  }
  getIsPopUpOpen() {
    return this.isPopUpOpen$;
  }
 
  setIsLogin(event: boolean) {
    this.isLogin$.next(event);
  }

  getIsLogin() {
    return this.isLogin$;
  }



  
}
