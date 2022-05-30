import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAprojectContentItemComponent } from './create-aproject-content-item.component';

describe('CreateAprojectContentItemComponent', () => {
  let component: CreateAprojectContentItemComponent;
  let fixture: ComponentFixture<CreateAprojectContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAprojectContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAprojectContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
