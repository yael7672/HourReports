import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreedomProjectContentItemComponent } from './freedom-project-content-item.component';

describe('FreedomProjectContentItemComponent', () => {
  let component: FreedomProjectContentItemComponent;
  let fixture: ComponentFixture<FreedomProjectContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreedomProjectContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreedomProjectContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
