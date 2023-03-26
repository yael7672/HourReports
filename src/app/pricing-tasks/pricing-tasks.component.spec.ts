import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTasksComponent } from './pricing-tasks.component';

describe('PricingTasksComponent', () => {
  let component: PricingTasksComponent;
  let fixture: ComponentFixture<PricingTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
