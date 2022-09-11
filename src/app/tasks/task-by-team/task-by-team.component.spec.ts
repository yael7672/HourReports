import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByTeamComponent } from './task-by-team.component';

describe('TaskByTeamComponent', () => {
  let component: TaskByTeamComponent;
  let fixture: ComponentFixture<TaskByTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskByTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
