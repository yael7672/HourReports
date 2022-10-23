import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByEmployeeComponent } from './projects-by-employee.component';

describe('ProjectsByEmployeeComponent', () => {
  let component: ProjectsByEmployeeComponent;
  let fixture: ComponentFixture<ProjectsByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
