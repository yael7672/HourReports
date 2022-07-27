import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContectItemWithTimeComponent } from './project-contect-item-with-time.component';

describe('ProjectContectItemWithTimeComponent', () => {
  let component: ProjectContectItemWithTimeComponent;
  let fixture: ComponentFixture<ProjectContectItemWithTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContectItemWithTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContectItemWithTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
