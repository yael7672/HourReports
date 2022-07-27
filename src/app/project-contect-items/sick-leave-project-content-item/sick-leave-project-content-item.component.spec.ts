import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveProjectContentItemComponent } from './sick-leave-project-content-item.component';

describe('SickLeaveProjectContentItemComponent', () => {
  let component: SickLeaveProjectContentItemComponent;
  let fixture: ComponentFixture<SickLeaveProjectContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SickLeaveProjectContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveProjectContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
