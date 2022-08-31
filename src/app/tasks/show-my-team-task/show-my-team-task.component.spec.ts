import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyTeamTaskComponent } from './show-my-team-task.component';

describe('ShowMyTeamTaskComponent', () => {
  let component: ShowMyTeamTaskComponent;
  let fixture: ComponentFixture<ShowMyTeamTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMyTeamTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMyTeamTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
