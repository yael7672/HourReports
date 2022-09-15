import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectByManagerComponent } from './add-project-by-manager.component';

describe('AddProjectByManagerComponent', () => {
  let component: AddProjectByManagerComponent;
  let fixture: ComponentFixture<AddProjectByManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectByManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
