import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfWorkingHoursEmployeeComponent } from './details-of-working-hours-employee.component';

describe('DetailsOfWorkingHoursEmployeeComponent', () => {
  let component: DetailsOfWorkingHoursEmployeeComponent;
  let fixture: ComponentFixture<DetailsOfWorkingHoursEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfWorkingHoursEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfWorkingHoursEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
