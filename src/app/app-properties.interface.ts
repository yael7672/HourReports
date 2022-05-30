import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface AppProperties {
  deviceInfo$: BehaviorSubject<any>;
  isUnder1680$: BehaviorSubject<boolean>;
  isIE: boolean;
  isRtl$: BehaviorSubject<boolean>;
  isDesktop: boolean;
  isPopUpOpen$:BehaviorSubject<boolean>;
}
