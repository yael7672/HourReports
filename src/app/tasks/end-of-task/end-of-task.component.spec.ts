import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfTaskComponent } from './end-of-task.component';

describe('EndOfTaskComponent', () => {
  let component: EndOfTaskComponent;
  let fixture: ComponentFixture<EndOfTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
