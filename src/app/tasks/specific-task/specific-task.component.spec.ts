import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTaskComponent } from './specific-task.component';

describe('SpecificTaskComponent', () => {
  let component: SpecificTaskComponent;
  let fixture: ComponentFixture<SpecificTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
