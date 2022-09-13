import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfWorkingHoursEmployeeForAdminComponent } from './details-of-working-hours-employee-for-admin.component';

describe('DetailsOfWorkingHoursEmployeeForAdminComponent', () => {
  let component: DetailsOfWorkingHoursEmployeeForAdminComponent;
  let fixture: ComponentFixture<DetailsOfWorkingHoursEmployeeForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOfWorkingHoursEmployeeForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfWorkingHoursEmployeeForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
