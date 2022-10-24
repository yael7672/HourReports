import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContectItemByProjectComponent } from './project-contect-item-by-project.component';

describe('ProjectContectItemByProjectComponent', () => {
  let component: ProjectContectItemByProjectComponent;
  let fixture: ComponentFixture<ProjectContectItemByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContectItemByProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContectItemByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
