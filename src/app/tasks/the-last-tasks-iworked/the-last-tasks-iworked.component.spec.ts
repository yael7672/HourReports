import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLastTasksIWorkedComponent } from './the-last-tasks-iworked.component';

describe('TheLastTasksIWorkedComponent', () => {
  let component: TheLastTasksIWorkedComponent;
  let fixture: ComponentFixture<TheLastTasksIWorkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheLastTasksIWorkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheLastTasksIWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
