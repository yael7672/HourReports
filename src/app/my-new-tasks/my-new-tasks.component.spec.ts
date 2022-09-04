import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewTasksComponent } from './my-new-tasks.component';

describe('MyNewTasksComponent', () => {
  let component: MyNewTasksComponent;
  let fixture: ComponentFixture<MyNewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNewTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
