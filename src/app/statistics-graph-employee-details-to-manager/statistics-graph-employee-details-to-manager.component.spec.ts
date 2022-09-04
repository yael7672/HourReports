import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsGraphEmployeeDetailsToManagerComponent } from './statistics-graph-employee-details-to-manager.component';

describe('StatisticsGraphEmployeeDetailsToManagerComponent', () => {
  let component: StatisticsGraphEmployeeDetailsToManagerComponent;
  let fixture: ComponentFixture<StatisticsGraphEmployeeDetailsToManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsGraphEmployeeDetailsToManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsGraphEmployeeDetailsToManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
