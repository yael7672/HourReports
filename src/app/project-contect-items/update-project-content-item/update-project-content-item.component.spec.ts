import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectContentItemComponent } from './update-project-content-item.component';

describe('UpdateProjectContentItemComponent', () => {
  let component: UpdateProjectContentItemComponent;
  let fixture: ComponentFixture<UpdateProjectContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
