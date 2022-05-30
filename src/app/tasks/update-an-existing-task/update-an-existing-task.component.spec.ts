import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnExistingTaskComponent } from './update-an-existing-task.component';

describe('UpdateAnExistingTaskComponent', () => {
  let component: UpdateAnExistingTaskComponent;
  let fixture: ComponentFixture<UpdateAnExistingTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnExistingTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnExistingTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
