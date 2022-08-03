import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursAwaitingApprovalComponent } from './hours-awaiting-approval.component';

describe('HoursAwaitingApprovalComponent', () => {
  let component: HoursAwaitingApprovalComponent;
  let fixture: ComponentFixture<HoursAwaitingApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursAwaitingApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursAwaitingApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
