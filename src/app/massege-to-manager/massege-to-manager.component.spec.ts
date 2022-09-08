import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassegeToManagerComponent } from './massege-to-manager.component';

describe('MassegeToManagerComponent', () => {
  let component: MassegeToManagerComponent;
  let fixture: ComponentFixture<MassegeToManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassegeToManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassegeToManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
