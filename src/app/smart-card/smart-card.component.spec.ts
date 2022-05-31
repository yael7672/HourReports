import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCardComponent } from './smart-card.component';

describe('SmartCardComponent', () => {
  let component: SmartCardComponent;
  let fixture: ComponentFixture<SmartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
