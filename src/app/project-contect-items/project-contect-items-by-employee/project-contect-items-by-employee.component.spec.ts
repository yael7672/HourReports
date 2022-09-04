import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContectItemsByEmployeeComponent } from './project-contect-items-by-employee.component';

describe('ProjectContectItemsByEmployeeComponent', () => {
  let component: ProjectContectItemsByEmployeeComponent;
  let fixture: ComponentFixture<ProjectContectItemsByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContectItemsByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContectItemsByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
