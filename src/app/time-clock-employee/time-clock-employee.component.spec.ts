import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockEmployeeComponent } from './time-clock-employee.component';

describe('TimeClockEmployeeComponent', () => {
  let component: TimeClockEmployeeComponent;
  let fixture: ComponentFixture<TimeClockEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeClockEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
