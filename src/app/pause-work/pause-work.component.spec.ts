import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseWorkComponent } from './pause-work.component';

describe('PauseWorkComponent', () => {
  let component: PauseWorkComponent;
  let fixture: ComponentFixture<PauseWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PauseWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
