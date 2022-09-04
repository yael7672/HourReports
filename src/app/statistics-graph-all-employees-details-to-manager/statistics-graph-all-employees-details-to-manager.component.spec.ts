import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsGraphAllEmployeesDetailsToManagerComponent } from './statistics-graph-all-employees-details-to-manager.component';

describe('StatisticsGraphAllEmployeesDetailsToManagerComponent', () => {
  let component: StatisticsGraphAllEmployeesDetailsToManagerComponent;
  let fixture: ComponentFixture<StatisticsGraphAllEmployeesDetailsToManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsGraphAllEmployeesDetailsToManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsGraphAllEmployeesDetailsToManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
