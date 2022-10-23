import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProjectDetailsComponent } from './specific-project-details.component';

describe('SpecificProjectDetailsComponent', () => {
  let component: SpecificProjectDetailsComponent;
  let fixture: ComponentFixture<SpecificProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
