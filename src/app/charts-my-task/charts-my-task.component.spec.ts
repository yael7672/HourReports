import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMyTaskComponent } from './charts-my-task.component';

describe('ChartsMyTaskComponent', () => {
  let component: ChartsMyTaskComponent;
  let fixture: ComponentFixture<ChartsMyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsMyTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsMyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
