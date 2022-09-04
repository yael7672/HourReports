import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByEmployeeComponent } from './tasks-by-employee.component';

describe('TasksByEmployeeComponent', () => {
  let component: TasksByEmployeeComponent;
  let fixture: ComponentFixture<TasksByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
